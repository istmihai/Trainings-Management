using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingManagement.FirestoreLogger
{
    public class FirestoreLoggerEvents
    {
        public const string Login = "Login";
        public const string NewPassword = "NewPassword";
        public const string CreateTraining = "TrainingCreate";
        public const string DeleteTraining = "TrainingDelete";
        public const string EditTraining = "TrainingEdit";
        public const string RemoveEmployee = "EmployeeDelete";
        public const string AddEmployee = "EmployeeAdd";
        public const string AddDocument = "DocumentAdd";
    }
}
