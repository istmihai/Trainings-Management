using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TrainingManagement.Models;
namespace TrainingManagement.Interfaces
{
    public interface ITraining
    {
         Task<string> CreateTraining(Training training);
        Task DeleteTraining(string id);
        Task AddTraining(string trainingId, string employeeId);
        Task UpdateTraining(string trainingid, string employeeId,string status);
        Task RemoveTraining(string trainingId, string employeeId);
        Task EditTraining(Training training,string trainingId);
        Task UploadDocument(string trainingId,string employeeId, string code);
        Task<StringBuilder> DownloadRaport(string trainingId);
        Task<StringBuilder> DownloadRaportDepartament(string Departament,string year);
    }
}
