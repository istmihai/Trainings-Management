using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TrainingManagement.Interfaces;
using TrainingManagement.Models;
using Google.Rpc;

namespace TrainingManagement.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IEmployee _employeeService;
        private readonly IEmailSender _emailSender;
        public UserController(IEmployee employeeService, IEmailSender emailSender)
        {
            _employeeService = employeeService;
            _emailSender = emailSender;
        }

     /*   [HttpGet("api/users")]
        public IEnumerable<Employee> FiltereEmployees([FromQuery] EmployeeFilter filter)
        {
            return _employeeService.GetEmployees(filter);
           
        }*/


        [HttpPost("api/employee/add")]
        public async Task<ActionResult> Create([FromBody] Employee emp)
        {
            var validateUsername = await _employeeService.ValidateUsername(emp.Username);
            if (!validateUsername) return BadRequest();
            await  _employeeService.AddEmployee(emp);
            await _emailSender.SendInvitation(emp);
            return Ok();
            

        }

        [HttpPost("/api/employee/delete")]

        public async Task<ActionResult> Delete([FromQuery] string Id)
        {
            await _employeeService.DeleteEmployee(Id);
            await FirebaseAuth.DefaultInstance.DeleteUserAsync(Id);
            return Ok();
        }

        [HttpPost("/api/employee/edit")]
        public async Task<ActionResult> Update( Employee emp)
        {
            await _employeeService.EditEmployee(emp);
            return Ok();


        }

        [HttpGet("/api/employee/validation/email")]
        public async Task<ActionResult> EmailValidation([FromQuery] string email)
        {

            try
            {
                await FirebaseAuth.DefaultInstance.GetUserByEmailAsync(email);
                return Ok("Email is already used!");
            }
            catch (Exception)
            {
                return Ok();
            }
        }

        [HttpGet("api/employee/validation/username")]
        public async Task<ActionResult> UsernameValidation([FromQuery] string username)
        {
            bool isValid = await _employeeService.ValidateUsername(username);
            if (isValid) return Ok();
            else return Ok("Username is already used");
        }
        
        [HttpPost("api/employee/changephoto")]
        public async Task<ActionResult> UpdatePhoto ([FromQuery] string code,[FromQuery] string employeeId)
        {
            await _employeeService.ChangePhoto(employeeId, code);
            return Ok();
        }

    }
}