using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrainingManagement.Interfaces;
using TrainingManagement.Models;

namespace TrainingManagement.Services
{
    public class NotifyService : INotify
    {
        private readonly IFirestore _firestoreClient;

        private Dictionary<string,object> GetMessage(string message)
        {
            Dictionary<string, object> input = new Dictionary<string, object>()
            {
                {"timeStamp",Timestamp.GetCurrentTimestamp() },
                {"unread",true },
                {"message",message }
            };
            return input;
        }

        public NotifyService(IFirestore firestoreClient)
        {
            _firestoreClient = firestoreClient;
        }

        public async Task NotifyChangeTraining(string employeeId,  string trainingId)
        {
          var colRef=  _firestoreClient.GetFirestoreDb().Collection("Employees").Document(employeeId).Collection("Messages");
            var trainingRef = await _firestoreClient.GetFirestoreDb().Collection("Trainings").Document(trainingId).GetSnapshotAsync();
            var training = trainingRef.ConvertTo<Training>();
           await colRef.AddAsync(GetMessage($"Training Change"));
        }

        public async Task NotifyDeleteTraining(string employeeId, string trainingId)
        {
            var colRef = _firestoreClient.GetFirestoreDb().Collection("Employees").Document(employeeId).Collection("Messages");
         
            await colRef.AddAsync(GetMessage($"Training Delete"));
        }

        public  async Task NotifyNewTraining(string employeeId,  string trainingId)
        {
            var  colRef = _firestoreClient.GetFirestoreDb().Collection("Employees").Document(employeeId).Collection("Messages");
            var trainingRef = await _firestoreClient.GetFirestoreDb().Collection("Trainings").Document(trainingId).GetSnapshotAsync();
            var training = trainingRef.ConvertTo<Training>();
            await colRef.AddAsync(GetMessage($"New training {training.Title}"));
        }
    }
}
