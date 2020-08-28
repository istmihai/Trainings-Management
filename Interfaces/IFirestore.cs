using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using TrainingManagement.Models;

namespace TrainingManagement.Interfaces
{
   public interface IFirestore
   {

        public FirestoreDb GetFirestoreDb();

    }
}
