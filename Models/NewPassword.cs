using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingManagement.Models
{
   
    public class NewPassword
    {
      
        public string Code { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
