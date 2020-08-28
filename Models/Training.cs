using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Firestore;

namespace TrainingManagement.Models
{
    [FirestoreData]
    public class Training
    {
        [FirestoreDocumentId]
        public string Id { get; set; }
        [FirestoreProperty] 
        public string Title { get; set; } 
        [FirestoreProperty] public string Description { get; set; }
        [FirestoreProperty] public DateTime StartDate { get; set; }
      
        [FirestoreProperty] public DateTime EndDate { get; set; }
        [FirestoreProperty] public string Location { get; set; }
        [FirestoreProperty] public string Status { get; set; }
        [FirestoreProperty] public string Document { get; set; }
        [FirestoreProperty] public string AccessLevel { get; set; }
        [FirestoreDocumentCreateTimestamp] public DateTime CreateDateTime { get; set; }
        [FirestoreDocumentUpdateTimestamp] public DateTime UpdatedTime { get; set; }
    }
}
