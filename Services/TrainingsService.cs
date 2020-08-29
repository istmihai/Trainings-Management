using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TrainingManagement.Interfaces;
using TrainingManagement.Models;

namespace TrainingManagement.Services
{
    public class TrainingsService : ITraining
    {

        private readonly IFirestore _firestoreDb;

        public Lazy<List<Training>> Trainings = new Lazy<List<Training>>();
        public Lazy<List<Training>> FilteredTrainings = new Lazy<List<Training>>();
        public TrainingsService(IFirestore firestore)
        {
            _firestoreDb = firestore;
           
        }

        public async Task AddTraining(string trainingId, string employeeId)
        {
            var employee = _firestoreDb.GetFirestoreDb().Collection("Employees").Document(employeeId).GetSnapshotAsync().Result.ConvertTo<Employee>();
            var training = _firestoreDb.GetFirestoreDb().Collection("Trainings").Document(trainingId).GetSnapshotAsync().Result.ConvertTo<Training>();

            var employeeInfo = new Dictionary<string, string>()
            {
                {"employeeId",employee.Id },
                {"status",training.Status},
                {"trainingId",trainingId }
            };
            var trainingInfo = new Dictionary<string, string>()
            {
                {"status",training.Status}
            };
            
            await _firestoreDb.GetFirestoreDb().Collection("Trainings").Document(training.Id).Collection("Employee_Trainings").Document(employee.Id).CreateAsync(employeeInfo);
            await _firestoreDb.GetFirestoreDb().Collection("Employees").Document(employee.Id).Collection("Training_Employees").Document(training.Id).CreateAsync(trainingInfo);
        }

        public async Task CreateTraining(Training training)
        {
            await _firestoreDb.GetFirestoreDb().Collection("TrainingsFilter").Document("Location").UpdateAsync("Location", FieldValue.ArrayUnion(training.Location));
            await _firestoreDb.GetFirestoreDb().Collection("TrainingsFilter").Document("Title").UpdateAsync("Title", FieldValue.ArrayUnion(training.Title));

            Dictionary<string, int> stats = new Dictionary<string, int>()
            {
                { "Done",0},
                {"In Progess",0 },
                {"Finished",0 }
            };
          var tran=  await _firestoreDb.GetFirestoreDb().Collection("Trainings").AddAsync(training);
         await   _firestoreDb.GetFirestoreDb().Collection("Trainings").Document(tran.Id).Collection("Stats").Document("Stats").CreateAsync(stats);
 
        }

        public async Task DeleteTraining([FromQuery] string id)
        {
            await _firestoreDb.GetFirestoreDb().Collection("Trainings").Document(id).DeleteAsync();
           
        }

        public async Task RemoveTraining(string trainingId,[FromQuery] string employeeId)
        {
            await _firestoreDb.GetFirestoreDb().Collection("Employees").Document(employeeId).Collection("Employee_Trainings").Document(trainingId).DeleteAsync();
            await _firestoreDb.GetFirestoreDb().Collection("Trainings").Document(trainingId).Collection("Training_Employees").Document(employeeId).DeleteAsync();

        }

        public async Task EditTraining(Training training, [FromQuery] string id)
        {
            var trainRef = _firestoreDb.GetFirestoreDb().Collection("Trainings").Document(id);
            await trainRef.SetAsync(training);

        }

        public IEnumerable<Training> GetTrainings(TrainingFilter filter)
        {
            
            foreach(Training training in Trainings.Value)
            {

                if (!String.IsNullOrEmpty(filter.Title))
                    if (!training.Title.Contains(filter.Title)) continue;
                if (!String.IsNullOrEmpty(filter.Status))
                    if (!String.Equals(filter.Status, training.Status)) continue;
                if (!String.IsNullOrEmpty(filter.Location))
                    if (!String.Equals(filter.Location, training.Location)) continue;
                FilteredTrainings.Value.Add(training);
            }
            
            return FilteredTrainings.Value;
        }

        public async Task UpdateTraining(EmployeeTraining training,  [FromQuery] string  employeeId)
        {
            Dictionary<FieldPath, object> updates = new Dictionary<FieldPath, object>()
            {
                {new FieldPath("Status"), training.Status },

            };
            await _firestoreDb.GetFirestoreDb().Collection("Employees").Document(employeeId).Collection("Employee_Trainings")
              .Document(training.EmployeeId).UpdateAsync(updates);

        }

      
    }
}
