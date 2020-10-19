using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingManagement.Interfaces
{
   public interface INotify
    {
         Task NotifyNewTraining(string employeeId, string trainingId);
         Task NotifyChangeTraining(string employeeId, string trainingId);
         Task NotifyDeleteTraining(string employeeId, string trainingId);
      //   Task ChangeFCM(string employeeId, string token); 
    }
}
