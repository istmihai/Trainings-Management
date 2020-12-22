using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingManagement.Models
{
    [FirestoreData]
    public class Review
    {
        [FirestoreProperty("trainingId")]
        public string TrainingId { get; set; }
        [FirestoreProperty("employeeId")]
        public string EmployeeId { get; set; }

        [FirestoreProperty("reviewMessage")]
        public string ReviewMessage { get; set; }
        
        [FirestoreProperty("rating")]
        public double Rating { get; set; }

        [FirestoreProperty("timeStamp")]
        public  Timestamp  Timestamp { get; set; }
    }
}
