using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingManagement.Models
{
    [FirestoreData]
    public class EmployeeInfo
    {
        [FirestoreProperty]
        public string Username { get; set; }
        [FirestoreProperty]
        public string PhotoUrl { get; set; }
        [FirestoreProperty]
        public string FirstName { get; set; }
        [FirestoreProperty]
        public string LastName { get; set; }
    }
}
