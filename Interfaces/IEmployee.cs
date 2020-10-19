using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrainingManagement.Models;

namespace TrainingManagement.Interfaces
{
   public interface IEmployee
    {
        Task AddEmployee(Employee employee);
        Task DeleteEmployee(string employeeId);
        Task EditEmployee(Employee employee);
        Task ChangePhoto(string employeeId, string code);
        Task MarkRead(string messagesId,string employeeId);
        Task DeleteMessage(string messagesId, string employeeId);
        Task<bool> ValidateUsername(string username);
     //   IEnumerable<Employee> GetEmployees(EmployeeFilter filter);
    }
}
