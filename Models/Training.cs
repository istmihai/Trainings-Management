﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        [MinLength(3)]
        [MaxLength(50)]
        public string Title { get; set; } 

        [FirestoreProperty]
        [MinLength(3)]
        [MaxLength(50)]
        public string Description { get; set; }
        [FirestoreProperty]
        public DateTime StartDate { get; set; }
      
        [FirestoreProperty]
        public DateTime EndDate { get; set; }
        [FirestoreProperty] 
        public string Location { get; set; }

        [FirestoreProperty] 
        public string Status { get; set; }
        [FirestoreProperty]
        public string Document { get; set; }

        [FirestoreProperty("rating")]
        
        public  double Rating { get; set; }

        [FirestoreProperty("price")]
        public double Price { get; set; }
        public string AccessLevel { get; set; }
        [FirestoreDocumentCreateTimestamp] 
        public DateTime CreateDateTime { get; set; }
        [FirestoreDocumentUpdateTimestamp]
        public DateTime UpdatedTime { get; set; }

        public override string ToString()
        {
            return $"Title,{Title} {Environment.NewLine}Description,{Description} {Environment.NewLine}End Date,{EndDate.ToShortDateString()} {Environment.NewLine}Start Date,{StartDate.ToShortDateString()} {Environment.NewLine} " +
                $"Location,{Location},{Environment.NewLine}"+
                $"Status,{Status},{Environment.NewLine}";
        }
    }
   
    
}
