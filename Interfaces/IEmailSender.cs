using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrainingManagement.Models;


namespace TrainingManagement.Interfaces
{
   public interface IEmailSender
    {
        Task SendActivation(Employee user ,string code);
        Task SendInvitation(Employee emp);
        Task TrainingEditNotification(IEnumerable<Employee> employees, Training training);

    }
}
