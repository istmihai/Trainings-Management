using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrainingManagement.Interfaces;
using TrainingManagement.Services;
using System.Text.Json;
using System.Text.Json.Serialization;


namespace TrainingManagement.FirestoreLogger
{
    public class FirestoreLogger : ILogger
    {
        private readonly string _uid;
        private readonly FirestoreLoggerConfiguration _config;
        private readonly FirestoreDb _firestoreClient;

        public FirestoreLogger(string Uid, FirestoreLoggerConfiguration config)
        {
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", @"C:\Users\Mihai-AlexandruIstra\Downloads\trainingmanagement-5cda0-firebase-adminsdk-j780k-902a921430.json");
            _firestoreClient = FirestoreDb.Create("trainingmanagement-5cda0");
            _uid = Uid;
            _config = config;
        }
        public IDisposable BeginScope<TState>(TState state)
        {
            return null;
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return logLevel == _config.LogLevel;
        }


        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            string msg = formatter(state,exception);
           LogEntry log = JsonSerializer.Deserialize<LogEntry>(msg);
            log.TimeStamp = Timestamp.GetCurrentTimestamp();
            Dictionary<string, object> test = new Dictionary<string, object>()
            {
                {"Action", log.Action},
                {"Message",log.Message },
                {"TimeStamp",Timestamp.GetCurrentTimestamp() },
                {"ObjectId",log.LogInfo  }
          
            };
         //   _firestoreClient.Collection("Events").AddAsync(log);
            _firestoreClient.Collection("Events").AddAsync(test);

        }
    

    }
}
