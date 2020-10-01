using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Threading.Tasks;

namespace TrainingManagement.FirestoreLogger
{
    public static class FirestoreLoggerExtenstion
    {
       
        public static ILoggerFactory AddFirestoreLogger(
                                     this ILoggerFactory loggerFactory,
                                     FirestoreLoggerConfiguration config)
        {
            loggerFactory.AddProvider(new FirestoreLoggerProvider(config));
            return loggerFactory;
        }
        public static ILoggerFactory AddFirestoreLogger(
                                    this ILoggerFactory loggerFactory)
        {
            var config = new FirestoreLoggerConfiguration();
            return loggerFactory.AddFirestoreLogger(config);
        }
        public static ILoggerFactory AddFirestoreLogger(
                                        this ILoggerFactory loggerFactory,
                                        Action<FirestoreLoggerConfiguration> configure)
        {
            var config = new FirestoreLoggerConfiguration();
            configure(config);
            return loggerFactory.AddFirestoreLogger(config);
        }
    }
}
