using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingManagement.FirestoreLogger
{
    public class FirestoreLoggerEvents
    {
        public const int Login = 1000;
        public const int NewPassword = 1001;
        public const int CreateTraining = 1010;
        public const int DeleteTraining = 1011;
        public const int EditTraining = 1012;
        public const int RemoveEmployee = 1014;
        public const int AddEmployee = 1013;
        public const int AddDocument = 1014;
        public const int LoginFailed = 4000;
    }
}
