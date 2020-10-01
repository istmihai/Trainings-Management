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

namespace TrainingManagement.Controllers
{
    [ApiController]
    public class TrainingController : ControllerBase
    {
       // private readonly IEmailSender _emailSender;
        private readonly ITraining _trainingService;
        private readonly ILogger _logger;
        public TrainingController(   ITraining trainingService ,ILogger<TrainingController> logger)
        {
       //     _emailSender = emailSender;
            _trainingService = trainingService;
            _logger = logger;
        }

        [HttpPost("api/training/add")]
        public async Task<ActionResult> Create(Training training)
        {
            if (this.HttpContext.Session.GetString("Role") != "Admin") return Unauthorized();
        string trainingId=  await  _trainingService.CreateTraining(training);

            _logger.LogInformation(FirestoreLoggerEvents.CreateTraining,"Admin - {Uid} created training - {trainingId} at {date}", this.HttpContext.Session.GetString("Uid"), trainingId, DateTime.UtcNow);
          
            return Ok();
        }

        [HttpPost("/api/training/edit")]
        public async Task<ActionResult> Update(Training training,[FromQuery] string id)
        {
          await _trainingService.EditTraining(training,id);
            _logger.LogInformation(FirestoreLoggerEvents.EditTraining, "Admin -{Uid} edited training - {trainingId} at {date}", this.HttpContext.Session.GetString("Uid"), id, DateTime.Now);
            return Ok();
        }

        [HttpPost("/api/training/addemployee")]
        public async Task <ActionResult> AddTraining([FromQuery] string trainingId,[FromQuery] string employeeId)
        {
            await _trainingService.AddTraining(trainingId, employeeId);
            _logger.LogInformation(FirestoreLoggerEvents.AddEmployee, "Admin -{Uid} added employee {employeeId} to training - {trainingId} at {date}", this.HttpContext.Session.GetString("Uid"),employeeId, trainingId, DateTime.Now);

            return Ok();
        }

        [HttpPost("/api/training/removeemployee")]
        public async Task<ActionResult> RemoveTraining([FromQuery] string trainingId, [FromQuery] string employeeId,[FromQuery] string status)
        {
            await _trainingService.RemoveTraining(trainingId, employeeId);
            _logger.LogInformation(FirestoreLoggerEvents.RemoveEmployee, "Admin -{Uid} removed employee {employeeId} from training - {trainingId} at {date}", this.HttpContext.Session.GetString("Uid"), employeeId, trainingId, DateTime.Now);

            return Ok();
        }

        [HttpPost("api/training/document")]
        public async Task<ActionResult> Document ([FromQuery] string employeeId,[FromQuery] string trainingId,[FromQuery] string code)
        {
            await _trainingService.UploadDocument(trainingId, employeeId, code);
            _logger.LogInformation(FirestoreLoggerEvents.AddDocument, "Employee {Uid} uploaded document for training {trainingId} at {date}", this.HttpContext.Session.GetString("Uid"), employeeId, trainingId, DateTime.Now);

            return Ok();
        }

        [HttpPost("/api/training/delete")]
        public async Task<ActionResult> DeleteTraining([FromQuery]  string trainingId)
        {
          await  _trainingService.DeleteTraining(trainingId);
            _logger.LogInformation(FirestoreLoggerEvents.DeleteTraining, "Admin - {Uid} deleted training - {trainingId} at {date}", this.HttpContext.Session.GetString("Uid"), trainingId, DateTime.UtcNow);
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
            _logger.LogInformation(FirestoreLoggerEvents.AddDocument, "Admin - {Uid} download training - {trainingId} at {date}", this.HttpContext.Session.GetString("Uid"), trainingId, DateTime.UtcNow);

            return File(Encoding.UTF8.GetBytes
      (x.ToString()), "text/csv", "test.csv");
        }
        [HttpGet("api/training/reportDepartament")]
        public async Task<ActionResult> DownloaDepartamentReport([FromQuery] string Departament,[FromQuery] string year)
        {
            StringBuilder x = await _trainingService.DownloadRaportDepartament(Departament,year);
            _logger.LogInformation(FirestoreLoggerEvents.AddDocument, "Admin - {Uid} download report at {date}", this.HttpContext.Session.GetString("Uid"), DateTime.UtcNow);

            return File(Encoding.UTF8.GetBytes
      (x.ToString()), "text/csv", "Training.csv");
        }


        /*    [HttpGet("/api/trainings")]
            public  IEnumerable<Training> FilterTraining([FromQuery] TrainingFilter filter)
            {
                return _trainingService.GetTrainings(filter);
            }*/
    }
}