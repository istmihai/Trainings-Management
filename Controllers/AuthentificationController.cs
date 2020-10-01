using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TrainingManagement.FirestoreLogger;
using TrainingManagement.Interfaces;
using TrainingManagement.Models;
using static TrainingManagement.RandomCode;
namespace TrainingManagement.Controllers
{
    [ApiController]
    public class AuthentificationController : ControllerBase
    {
        private readonly IFirestore _firestore;
        private readonly IEmailSender _emailSender;
        private readonly ILogger _logger;

        public AuthentificationController(IFirestore firestore, IEmailSender emailSender,ILogger<AuthentificationController> logger)
        {
            _firestore = firestore;
            _emailSender = emailSender;
            _logger = logger;

        }

        [HttpPost("api/login")]
        public async Task<ActionResult> Login([FromQuery] string request)
        {
            try
            {
                var token = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(request);
                if (token.Claims.TryGetValue("Admin", out var x))
                {
                    this.HttpContext.Session.SetString("Uid", token.Uid);
                    this.HttpContext.Session.SetString("Role", "Admin");
                }
                else
                {
                    this.HttpContext.Session.SetString("Uid", token.Uid);
                    this.HttpContext.Session.SetString("Role", "Employee");
                }
                _logger.LogInformation(FirestoreLoggerEvents.Login, "User {id} logged in at {time}", token.Uid, DateTime.Now);
                    
                return Ok();
                
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("api/verifyEmail")]
        public async Task<ActionResult> VerifyEmail([FromQuery] string email)
        {
            string UserStatus = "Activated";
            try
            {
                var user = await FirebaseAuth.DefaultInstance.GetUserByEmailAsync(email);
                if (!user.EmailVerified)
                    UserStatus = "NotActivated";
            }
            catch (Exception)
            {
                UserStatus = "NotFound";
                
            }
            
         
            return Ok(UserStatus);
        }

        [HttpPost("api/logout")]
        public async Task<ActionResult> Logout()
        {
            this.Response.Cookies.Delete(".AspNetCore.Session");
            this.HttpContext.Session.Clear();
            return Ok();
        }

        [HttpPost("api/requestnewpassword")]
        public async Task<ActionResult> NewCode([FromQuery] string email)
        {
            var FireUser = FirebaseAuth.DefaultInstance.GetUserByEmailAsync(email);
            string code = GetRandomString(8);

            var activationCode = _firestore.GetFirestoreDb().Collection("ActivationCode").Document(FireUser.Result.Uid);
            var employeeRef = await _firestore.GetFirestoreDb().Collection("Employees").WhereEqualTo("Email", email).GetSnapshotAsync();
            Employee employee = employeeRef.Documents[0].ConvertTo<Employee>();
            PasswordCode passwordCode = new PasswordCode()
            {
                Code = code
            };

            await _emailSender.SendActivation(employee, code);
            await activationCode.SetAsync(passwordCode);
            return Ok();
        }

        [HttpPost("api/newpassword")]
        public async Task<ActionResult> NewPassword(NewPassword newPassword)
        {
            try
            {
                var FireUser = await FirebaseAuth.DefaultInstance.GetUserByEmailAsync(newPassword.Email);
                var codeRef = await _firestore.GetFirestoreDb().Collection("ActivationCode").Document(FireUser.Uid).GetSnapshotAsync();
                var code = codeRef.ConvertTo<PasswordCode>();

                if (String.Equals(newPassword.Code, code.Code) && (DateTime.UtcNow - code.RequestTime) < TimeSpan.FromHours(1))
                {
                    UserRecordArgs userRecord = new UserRecordArgs()
                    {
                        Uid = FireUser.Uid,
                        Password = newPassword.Password,
                        EmailVerified = true,
                        Disabled = false


                    };
                    await FirebaseAuth.DefaultInstance.UpdateUserAsync(userRecord);
                    _logger.LogInformation(FirestoreLoggerEvents.NewPassword, "User {uid} changed his password at {time}", FireUser.Uid, DateTime.Now);

                }
                return Ok();
            }
            catch (Exception)
            {

                return BadRequest();
            }
           
        }

    }
}