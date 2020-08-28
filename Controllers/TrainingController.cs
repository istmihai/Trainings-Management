using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TrainingManagement.Interfaces;
using TrainingManagement.Models;

namespace TrainingManagement.Controllers
{
    [ApiController]
    public class TrainingController : ControllerBase
    {
        private readonly IEmailSender _emailSender;
        private readonly ITraining _trainingService;
        public TrainingController( IEmailSender emailSender, ITraining trainingService)
        {
            _emailSender = emailSender;
            _trainingService = trainingService;
        }

        [HttpPost("api/training/add")]
        public async Task<ActionResult> Create(Training training)
        {
          await  _trainingService.CreateTraining(training);
            return Ok();
        }

        [HttpPost("/api/training/edit")]
        public async Task<ActionResult> Update(Training training,[FromQuery] string id)
        {
          await _trainingService.EditTraining(training,id);
            return Ok();
        }

        [HttpPost("/api/training/addemployee")]
        public async Task <ActionResult> AddTraining([FromQuery] string trainingId,[FromQuery] string employeeId)
        {
            await _trainingService.AddTraining(trainingId, employeeId);
            return Ok();
        }
      
        [HttpPost("/api/training/delete")]
        public async Task<ActionResult> DeleteTraining([FromQuery]  string trainingId)
        {
          await  _trainingService.DeleteTraining(trainingId);
           return Ok();
        }


        [HttpGet("/api/trainings")]
        public  IEnumerable<Training> FilterTraining([FromQuery] TrainingFilter filter)
        {
            return _trainingService.GetTrainings(filter);
        }
    }
}