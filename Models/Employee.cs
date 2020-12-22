using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TrainingManagement.Models.ValidationAttributes;

namespace TrainingManagement.Models
{
    [FirestoreData]
    public class Employee
    {
        [FirestoreDocumentId]
        public string Id { get; set; }
        [FirestoreProperty]
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Username { get; set; }
        [FirestoreProperty]
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Firstname { get; set; }

        [FirestoreProperty]
        [MinLength(3)]
        [MaxLength(50)]
        public string Lastname { get; set; }

        [FirestoreProperty]
        [Required]
        [EmailAddress(ErrorMessage ="Invalid Email"),]
        public string Email { get; set; }

        [FirestoreProperty]
        
        public DateTime Birthdate { get; set; }
        [FirestoreProperty]
        public string PhotoUrl { get; set; }

        [FirestoreProperty]
        [Departament]
        public string Departament { get; set; }

        [FirestoreProperty]
        [Required]
        [Role]
        public string Role { get; set; }
        [FirestoreDocumentCreateTimestamp]
        public DateTime CreationStamp { get; set; }
        [FirestoreDocumentUpdateTimestamp]
        public DateTime UpdateStamp { get; set; }

        [FirestoreProperty("metaData")]
        public EmployeeMetadata MetaData { get; set; }

        public override string ToString()
        {
            return $"{Username},{Firstname},{Lastname},{Email},{Birthdate.ToShortDateString()},{Departament}";
        }
    }    
}
