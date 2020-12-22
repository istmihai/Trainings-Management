using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TrainingManagement.FirestoreLogger;
using TrainingManagement.Interfaces;
using TrainingManagement.Models;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Linq.Expressions;
using Google.Cloud.Firestore;

namespace TrainingManagement.Controllers
{
    [ApiController]
    public class TrainingController : ControllerBase
    {
       // private readonly IEmailSender _emailSender;
        private readonly ITraining _trainingService;
        private readonly ILogger _logger;
        private readonly INotify _notify;
        public TrainingController(   ITraining trainingService ,ILogger<TrainingController> logger, INotify notify)
        {
       //     _emailSender = emailSender;
            _trainingService = trainingService;
            _logger = logger;
            _notify = notify;
        }

        [HttpPost("api/training/add")]
        public async Task<ActionResult> Create(Training training)
        {
            if (this.HttpContext.Session.GetString("Role") != "Admin") return Unauthorized();
        string trainingId=  await  _trainingService.CreateTraining(training);
            LogEntry logEntry = new LogEntry()
            {
                Action = FirestoreLoggerEvents.EditTraining.ToString(),
                LogInfo = new Dictionary<string, string>() { {"adminId",this.HttpContext.Session.GetString("Uid") },
                                                             {"trainingId",trainingId} },
            
                Message = $"Admin {this.HttpContext.Session.GetString("Uid")}  added  training \"{trainingId}\" at {DateTime.UtcNow}"
            };

            string message = JsonSerializer.Serialize<LogEntry>(logEntry);

            _logger.LogInformation(message);

            return Ok();
        }

        [HttpPost("/api/training/edit")]
        public async Task<ActionResult> Update(Training training, [FromQuery] string id)
        {
            await _trainingService.EditTraining(training, id);
            string _message = $"Admin {this.HttpContext.Session.GetString("Uid")}  edited  training \"{id}\" at {DateTime.UtcNow}";
           
                          
             LogEntry logEntry = new LogEntry()
            {
                Action = FirestoreLoggerEvents.EditTraining.ToString(),
                LogInfo = new Dictionary<string, string>() { {"adminId",this.HttpContext.Session.GetString("Uid") },
                                                             {"trainingId",id} },
     
                Message = _message
            };

            string message = JsonSerializer.Serialize<LogEntry>(logEntry);

            _logger.LogInformation(message);
            return Ok();
        }

        [HttpPost("/api/training/addemployee")]
        public async Task <ActionResult> AddTraining([FromQuery] string trainingId,[FromQuery] string employeeId)
        {
            await _trainingService.AddTraining(trainingId, employeeId);
            string _message = $"Admin {this.HttpContext.Session.GetString("Uid")}  added employee \" {employeeId} \" to training \" {trainingId} \" at {DateTime.UtcNow}";


            LogEntry logEntry = new LogEntry()
            {
                Action = FirestoreLoggerEvents.AddEmployee.ToString(),
                LogInfo = new Dictionary<string, string>() { {"adminId",this.HttpContext.Session.GetString("Uid") },
                                                             {"trainingId",trainingId},
                                                             {"employeeId",employeeId } },

                Message = _message
            };

            string message = JsonSerializer.Serialize<LogEntry>(logEntry);
            await _notify.NotifyNewTraining(employeeId, trainingId);
            _logger.LogInformation(message);
            return Ok();
        }

        [HttpPost("/api/training/removeemployee")]
        public async Task<ActionResult> RemoveTraining([FromQuery] string trainingId, [FromQuery] string employeeId,[FromQuery] string status)
        {
            await _trainingService.RemoveTraining(trainingId, employeeId);

            string _message = $"Admin {this.HttpContext.Session.GetString("Uid")}  removed employee \" {employeeId} \" from training \" {trainingId} \" at {DateTime.UtcNow}";


            LogEntry logEntry = new LogEntry()
            {
                Action = FirestoreLoggerEvents.RemoveEmployee.ToString(),
                LogInfo = new Dictionary<string, string>() { {"adminId",this.HttpContext.Session.GetString("Uid") },
                                                             {"trainingId",trainingId},
                                                             {"employeeId",employeeId } },

                Message = _message
            };

            string message = JsonSerializer.Serialize<LogEntry>(logEntry);
          await  _notify.NotifyDeleteTraining(employeeId, trainingId);
            _logger.LogInformation(message);
            return Ok();
        }

        [HttpPost("api/training/document")]
        public async Task<ActionResult> Document ([FromQuery] string employeeId,[FromQuery] string trainingId,[FromQuery] string code)
        {
            await _trainingService.UploadDocument(trainingId, employeeId, code);

            string _message = $"Employee {this.HttpContext.Session.GetString("Uid")}  uploaed document for training \"{trainingId}\" at {DateTime.UtcNow}";


            LogEntry logEntry = new LogEntry()
            {
                Action = FirestoreLoggerEvents.RemoveEmployee.ToString(),
                LogInfo = new Dictionary<string, string>() { {"adminId",this.HttpContext.Session.GetString("Uid") },
                                                             {"trainingId",trainingId},
                                                             {"employeeId",employeeId } },

                Message = _message
            };

            string message = JsonSerializer.Serialize<LogEntry>(logEntry);

            _logger.LogInformation(message);
            return Ok();
        }

        [HttpPost("/api/training/delete")]
        public async Task<ActionResult> DeleteTraining([FromQuery]  string trainingId)
        {
          await  _trainingService.DeleteTraining(trainingId);
            string Message = $"Admin {this.HttpContext.Session.GetString("Uid")} added deleted training \" {trainingId} \" at {DateTime.UtcNow}";

         /*LogEntry logEntry = new LogEntry(FirestoreLoggerEvents.EditTraining.ToString(),this.HttpContext.Session.GetString("Uid"),trainingId,Message);
         
            string message = JsonSerializer.Serialize<LogEntry>(logEntry);

            _logger.LogInformation(message);*/

            return Ok();
        }

        [HttpPost("api/training/update")]
        public async Task<ActionResult> UpdateStatus([FromQuery] string trainingId,[FromQuery] string employeeId,[FromQuery] string status)
        {
            await _trainingService.UpdateTraining(trainingId,employeeId,status);
                return Ok();
        }

        [HttpGet("api/training/raport")]
        public async Task <ActionResult> DownloadRaport([FromQuery]  string trainingId)
        {
          StringBuilder x=  await _trainingService.DownloadRaport(trainingId);

            return File(Encoding.UTF8.GetBytes
      (x.ToString()), "text/csv", "test.csv");
        }

        [HttpGet("api/training/reportDepartament")]
        public async Task<ActionResult> DownloaDepartamentReport([FromQuery] string Departament,[FromQuery] string year)
        {
            StringBuilder x = await _trainingService.DownloadRaportDepartament(Departament,year);

            return File(Encoding.UTF8.GetBytes
      (x.ToString()), "text/csv", "Training.csv");
        }

        [HttpPost("api/training/review")]
        public async Task<ActionResult> GiveFeedback([FromQuery] string trainingId,[FromBody] Review review)
        {
           await _trainingService.GiveRating(trainingId, review);
            return Ok();
        }


        /*    [HttpGet("/api/trainings")]
            public  IEnumerable<Training> FilterTraining([FromQuery] TrainingFilter filter)
            {
                return _trainingService.GetTrainings(filter);
            }*/
    }
}