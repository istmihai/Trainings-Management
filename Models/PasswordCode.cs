using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Firestore;

namespace TrainingManagement.Models
{   
    [FirestoreData]
    public class PasswordCode
    {
        [FirestoreProperty] public string Code { get; set; }
        [FirestoreDocumentCreateTimestamp] public DateTime RequestTime { get; set; }


    }
}
