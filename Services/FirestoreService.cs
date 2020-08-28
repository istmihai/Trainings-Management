using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;
using TrainingManagement.Interfaces;

namespace TrainingManagement.Services
{
    public class FirestoreService : IFirestore
    {
        private FirestoreDb FirestoreDb { get;  }

        public FirestoreService()
        {
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", @"C:\Users\Mihai-AlexandruIstra\Downloads\trainingmanagement-5cda0-firebase-adminsdk-j780k-902a921430.json");
           
            FirestoreDb = FirestoreDb.Create("trainingmanagement-5cda0");
           
        }
        public FirestoreDb GetFirestoreDb()
        {
            return FirestoreDb;
        }
    }
}
