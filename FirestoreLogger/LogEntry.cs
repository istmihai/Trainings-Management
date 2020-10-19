using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingManagement.FirestoreLogger
{
    public class LogEntry
    {
        public string Action { get; set; }
        public Timestamp? TimeStamp { get; set; }
        public Dictionary<string,string> LogInfo  { get; set; }
        public string  Message { get; set; }

      /*  public LogEntry(string _action , string _userId , string _objectId , string _message)
        {
            this.Action = _action;
            this.UserId = _userId;
            this.ObjectId = _objectId;
            this.Message = _message;
        }*/
    }
}
