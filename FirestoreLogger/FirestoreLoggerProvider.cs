using Microsoft.Extensions.Logging;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrainingManagement.Interfaces;

namespace TrainingManagement.FirestoreLogger
{
    public class FirestoreLoggerProvider : ILoggerProvider
    {
        private readonly FirestoreLoggerConfiguration _config;
        private readonly ConcurrentDictionary<string, FirestoreLogger> _loggers = new ConcurrentDictionary<string, FirestoreLogger>();
        public FirestoreLoggerProvider(FirestoreLoggerConfiguration config )
        {
            _config = config;
        }
        public ILogger CreateLogger(string categoryName)
        {
            return _loggers.GetOrAdd(categoryName, name => new FirestoreLogger(name, _config));
        }

        public void Dispose()
        {
            _loggers.Clear();
        }
    }
}
