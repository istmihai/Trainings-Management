using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using TrainingManagement.Interfaces;
using TrainingManagement.Models;

namespace TrainingManagement.Services
{
    public class TrainingsService : ITraining
    {
       //TO DO - USE BATCHED WRITES /TRANSACTIONS
        private readonly IFirestore _firestoreDb;
        private readonly IEmailSender _emailSender;
        public TrainingsService(IFirestore firestore,IEmailSender emailSender)
        {
            _firestoreDb = firestore;
            _emailSender = emailSender;
        }
        private async Task<Training> GetTraining(string trainingId)
        {
            var trainingRef = await _firestoreDb.GetFirestoreDb().Collection("Trainings").Document(trainingId).GetSnapshotAsync();
            Training training = trainingRef.ConvertTo<Training>();
            return training;
        }
        private async Task<Employee> GetEmployee(string employeeId)
        {
            var employeeRef = await _firestoreDb.GetFirestoreDb().Collection("Employees").Document(employeeId).GetSnapshotAsync();
            Employee employee = employeeRef.ConvertTo<Employee>();
            return employee;
        }

        public async Task AddTraining(string trainingId, string employeeId)
        {

            Training training = await GetTraining(trainingId);
            Employee employee = await GetEmployee(employeeId);

            var employeeInfo = new Dictionary<string, object>()
            {
                {"employeeId",employeeId },
                {"status",training.Status},
                {"departament",employee.Departament},
                {"date",training.StartDate },
                {"trainingId",trainingId }
            };
            var trainingInfo = new Dictionary<string, object>()
            {
                {"status",training.Status},
               
            };
            var exists = new Dictionary<string, object>() {
                {"-1",true }
            };
            await _firestoreDb.GetFirestoreDb().Collection("Employees").Document(employeeId).Collection("Statistics").Document(training.StartDate.Year.ToString()).SetAsync(exists);
            await _firestoreDb.GetFirestoreDb().Collection("Trainings").Document(training.Id).Collection("Employee_Trainings").Document(employee.Id).CreateAsync(employeeInfo);
            await _firestoreDb.GetFirestoreDb().Collection("Employees").Document(employee.Id).Collection("Training_Employees").Document(training.Id).CreateAsync(trainingInfo);
        }

        public async Task<string> CreateTraining(Training training)
        {
            await _firestoreDb.GetFirestoreDb().Collection("TrainingsFilter").Document("Location").UpdateAsync("Location", FieldValue.ArrayUnion(training.Location));
            await _firestoreDb.GetFirestoreDb().Collection("TrainingsFilter").Document("Title").UpdateAsync("Title", FieldValue.ArrayUnion(training.Title));

            Dictionary<string, int> stats = new Dictionary<string, int>()
            {
                {"Canceled",0}, 
                {"InProgress",0 },
                {"Finished",0 }
            };
            var tran=  await _firestoreDb.GetFirestoreDb().Collection("Trainings").AddAsync(training);
            await   _firestoreDb.GetFirestoreDb().Collection("Trainings").Document(tran.Id).Collection("Stats").Document("Stats").CreateAsync(stats);
            return tran.Id;
        }

        public async Task DeleteTraining( string id)
        {
            await _firestoreDb.GetFirestoreDb().Collection("Trainings").Document(id).DeleteAsync();
            var subTr= await _firestoreDb.GetFirestoreDb().Collection("Trainings").Document(id).Collection("Training_Employees").GetSnapshotAsync();
            foreach(var x in subTr)
            {
             await   _firestoreDb.GetFirestoreDb().Document($"Employees/{x.Id}/Training_Employees/{id}").DeleteAsync();
             await  x.Reference.DeleteAsync();
            }
     
        }

        public async Task RemoveTraining( string trainingId, string employeeId)
        {
            await _firestoreDb.GetFirestoreDb().Collection("Employees").Document(employeeId).Collection("Training_Employees").Document(trainingId).DeleteAsync();
            await _firestoreDb.GetFirestoreDb().Collection("Trainings").Document(trainingId).Collection("Employee_Trainings").Document(employeeId).DeleteAsync();
            
        }

        public async Task EditTraining(Training training,  string id)
        {
            var trainRef = _firestoreDb.GetFirestoreDb().Collection("Trainings").Document(id);
            var employeeSub =await trainRef.Collection("Employee_Trainings").GetSnapshotAsync();
            List<Employee> employees = new List<Employee>();
            foreach(var snapshot in employeeSub.Documents)
            {
                var employeeRef = await _firestoreDb.GetFirestoreDb().Collection("Employees").Document(snapshot.Id).GetSnapshotAsync();
                var employee = employeeRef.ConvertTo<Employee>();
                employees.Add(employee);
            }
            await _emailSender.TrainingEditNotification(employees, training);
            await trainRef.SetAsync(training);

        }

      public async Task UploadDocument(string trainingId,string employeeId,string code)
        {
            Dictionary<FieldPath, object> document = new Dictionary<FieldPath, object>()
            {
               {new FieldPath("Document"),code },
            };
            await _firestoreDb.GetFirestoreDb().Document($"Employees/{employeeId}/Training_Employees/{trainingId}").UpdateAsync(document);
        }
        public async Task UpdateTraining(string trainingId,   string  employeeId, string Status)
        {
            Dictionary<FieldPath, object> updates = new Dictionary<FieldPath, object>()
            {
                {new FieldPath("status"), Status },

            };
            await _firestoreDb.GetFirestoreDb().Collection("Employees").Document(employeeId).Collection("Training_Employees")
              .Document(trainingId).UpdateAsync(updates);
            await _firestoreDb.GetFirestoreDb().Collection("Trainings").Document(trainingId).Collection("Employee_Trainings")
              .Document(employeeId).UpdateAsync(updates);
        }

        public async Task<StringBuilder> DownloadRaport(string trainingId)
        {
            var trainingsColRef = _firestoreDb.GetFirestoreDb().Collection("Trainings").Document(trainingId).Collection("Employee_Trainings");
            var employeeTrainings = await trainingsColRef.GetSnapshotAsync();
            var statsRef = await _firestoreDb.GetFirestoreDb().Collection("Trainings").Document(trainingId).Collection("Stats").Document("Stats").GetSnapshotAsync();
            TrainingStats stats = statsRef.ConvertTo<TrainingStats>();
            var training = await GetTraining(trainingId);
            var builder = new StringBuilder();
            builder.Append(training.ToString());
            builder.AppendLine();
            builder.Append(stats.ToString());
            builder.AppendLine();
            builder.Append("Username,Firstname,Lastname,Email,Birthdate,Departament,Status");

            builder.AppendLine();
            foreach (var employeeRef  in employeeTrainings.Documents)
            {
                Employee employee = await GetEmployee(employeeRef.Id);
                string status = employeeRef.GetValue<string>("status");
                builder.Append(employee.ToString()+","+status);
                builder.AppendLine();

            }
            return builder;
        }
      public async Task<StringBuilder> DownloadRaportDepartament(string Departament,string year)
        {
            var builder = new StringBuilder();
            var trainingStats = await _firestoreDb.GetFirestoreDb().Collection("Departaments").Document(Departament).Collection("Statistics").Document(year).GetSnapshotAsync();

         var Stats= trainingStats.ToDictionary();
            builder.Append(" January,February,March,April,June,July,August,September,November,December");

            foreach(var mstats in Stats)
            {
                builder.Append(mstats.Value.ToString());            
            }



       /*     var statsRef = await _firestoreDb.GetFirestoreDb().Collection("Trainings").Document(trainingId).Collection("Stats").Document("Stats").GetSnapshotAsync();
            TrainingStats stats = statsRef.ConvertTo<TrainingStats>();
          //  var training = await GetTraining(trainingId);
            //var builder = new StringBuilder();
          //  builder.Append(training.ToString());
            builder.AppendLine();
            builder.Append(stats.ToString());
            builder.AppendLine();
            builder.Append("Username,Firstname,Lastname,Email,Birthdate,Departament,Status");

            builder.AppendLine();
            foreach (var employeeRef in employeeTrainings.Documents)
            {
                Employee employee = await GetEmployee(employeeRef.Id);
                string status = employeeRef.GetValue<string>("status");
                builder.Append(employee.ToString() + "," + status);
                builder.AppendLine();

            }*/
            return builder;
        }

        public async Task GiveRating(string trainingId, Review review)
        {
            var employeeTrainingRef= _firestoreDb.GetFirestoreDb().Document($"Trainings/{trainingId}/Reviews/{review.EmployeeId}");
            review.Timestamp = Timestamp.GetCurrentTimestamp();
            await employeeTrainingRef.SetAsync(review);



        }
    }
}
