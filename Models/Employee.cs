using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingManagement.Models
{
    [FirestoreData]
    public class Employee
    {
        [FirestoreDocumentId]
        public string Id { get; set; }
        [FirestoreProperty]
        public string Username { get; set; }

        [FirestoreProperty]
        public string Firstname { get; set; }

        [FirestoreProperty]
        public string Lastname { get; set; }

        [FirestoreProperty]
        [EmailAddress(ErrorMessage ="Invalid Email"),]
        public string Email { get; set; }

        [FirestoreProperty]
        public DateTime Birthdate { get; set; }
        [FirestoreProperty]
        public string PhotoUrl { get; set; }
        [FirestoreProperty]
        
        public string Role { get; set; }
       [FirestoreDocumentCreateTimestamp]
        public DateTime CreationStamp { get; set; }
        [FirestoreDocumentUpdateTimestamp]
        public DateTime UpdateStamp { get; set; }
    }    
}
