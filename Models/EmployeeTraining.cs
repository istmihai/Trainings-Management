using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingManagement.Models
{
    [FirestoreData]
    public class EmployeeTraining
    {
        [FirestoreProperty]
        public string EmployeeId { get; set; }
        [FirestoreProperty]
        public string Status { get; set; }
    }
}
