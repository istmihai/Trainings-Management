using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingManagement.FirestoreLogger
{
    public class FirestoreLoggerEvents
    {
        public const string Login = "Login";
        public const string NewPassword = "New Password";
        public const string CreateTraining = "Training Create";
        public const string DeleteTraining = "Training Delete";
        public const string EditTraining = "Training Edit";
        public const string RemoveEmployee = "Employee Delete";
        public const string AddEmployee = "Employee Add";
        public const string AddDocument = "Document Add";
    }
}
