using System.Collections.Generic;
using System.Threading.Tasks;
using TrainingManagement.Models;
namespace TrainingManagement.Interfaces
{
    public interface ITraining
    {
         Task CreateTraining(Training training);
        Task DeleteTraining(string id);
        Task AddTraining(string trainingId, string employeeId);
        Task UpdateTraining(EmployeeTraining training, string employeeId);
        Task RemoveTraining(string trainingId, string employeeId);
        Task EditTraining(Training training,string trainingId);
          IEnumerable<Training> GetTrainings(TrainingFilter filter);
    }
}
