using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingManagement.Models
{
    [FirestoreData]
    public class EmployeeMetadata
    {
        [FirestoreProperty("lastSignInTime")]
        public Timestamp LastSignInTime { get; set; }

        [FirestoreProperty("creationTime")]
        public Timestamp CreationTime { get; set; }
    }
}
