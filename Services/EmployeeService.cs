using FirebaseAdmin.Auth;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using MimeKit.Encodings;
using Org.BouncyCastle.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using TrainingManagement.Interfaces;
using TrainingManagement.Models;
using static TrainingManagement.RandomCode;

namespace TrainingManagement.Services
{
    public class EmployeeService : IEmployee
    {
        private readonly IFirestore _firestoreDb;
        

        public EmployeeService(IFirestore firestore)
        {
            _firestoreDb = firestore;

        }

    
        public async Task AddEmployee(Employee employee)
        {
            UserRecordArgs userRecordArgs = new UserRecordArgs()
            {
                DisplayName = employee.Username,
                Password = GetRandomString(12),
                Email = employee.Email,
                Disabled = true,
                EmailVerified = false,
            };

            var auth = await FirebaseAuth.DefaultInstance.CreateUserAsync(userRecordArgs);
            var claims = new Dictionary<string, object>()
{
    { employee.Role, true },
};

            await FirebaseAuth.DefaultInstance.SetCustomUserClaimsAsync(auth.Uid, claims);
            await _firestoreDb.GetFirestoreDb().Collection("EmployeesFilter").Document("Username").UpdateAsync("Username", FieldValue.ArrayUnion(employee.Username));
            await _firestoreDb.GetFirestoreDb().Collection("EmployeesFilter").Document("Email").UpdateAsync("Email", FieldValue.ArrayUnion(employee.Email));
            await _firestoreDb.GetFirestoreDb().Collection("EmployeesFilter").Document("Name").UpdateAsync("Name", FieldValue.ArrayUnion(employee.Firstname + " " + employee.Lastname));
            employee.MetaData.CreationTime = Timestamp.GetCurrentTimestamp();
            await _firestoreDb.GetFirestoreDb().Collection("Employees").Document(auth.Uid).SetAsync(employee);
          
        }

        public async Task ChangePhoto(string employeeId, string code) 
        {
            Dictionary<string, object> update = new Dictionary<string, object>()
            {
                { "PhotoUrl", code }
            };
            
            await _firestoreDb.GetFirestoreDb().Collection("Employees").Document(employeeId).UpdateAsync(update);

        }

        public async Task DeleteEmployee(string employeeId)
        {
            var snapshot = await _firestoreDb.GetFirestoreDb().Collection("Employees").Document(employeeId).GetSnapshotAsync();
            Employee _employee = snapshot.ConvertTo<Employee>();

            await _firestoreDb.GetFirestoreDb().Collection("EmployeesFilter").Document("Username").UpdateAsync("Username", FieldValue.ArrayRemove(_employee.Username));
            await _firestoreDb.GetFirestoreDb().Collection("EmployeesFilter").Document("Email").UpdateAsync("Email", FieldValue.ArrayRemove(_employee.Email));
            await _firestoreDb.GetFirestoreDb().Collection("EmployeesFilter").Document("Name").UpdateAsync("Name", FieldValue.ArrayRemove(_employee.Firstname + " " + _employee.Lastname));
            var employeeRef = _firestoreDb.GetFirestoreDb().Collection("Employees").Document(employeeId);

            await employeeRef.DeleteAsync();
         
            await FirebaseAuth.DefaultInstance.DeleteUserAsync(employeeId);
        }

        public async Task DeleteMessage(string messagesId, string employeeId)
        {
            await _firestoreDb.GetFirestoreDb().Document($"Employees/{employeeId}/Messages/{messagesId}").DeleteAsync();
        
        }

        public async Task EditEmployee(Employee employee)
        {
            var auxUser = await FirebaseAuth.DefaultInstance.GetUserByEmailAsync(employee.Email);
            var authUser = new UserRecordArgs()
            {
                Uid = auxUser.Uid,
                Email = employee.Email,
                DisplayName = employee.Username,


            };
            var auth = await FirebaseAuth.DefaultInstance.UpdateUserAsync(authUser);
            var claims = new Dictionary<string, object>()
{
    { employee.Role, true },
};
            await FirebaseAuth.DefaultInstance.SetCustomUserClaimsAsync(auth.Uid, claims);
            await _firestoreDb.GetFirestoreDb().Collection("Employees").Document(auth.Uid).SetAsync(employee);
         
           
        }

        public async Task MarkRead(string messagesId, string employeeId)
        {
            Dictionary<string, object> update = new Dictionary<string, object>()
            {
                {"unread",false }
            };
            await _firestoreDb.GetFirestoreDb().Document($"Employees/{employeeId}/Messages/{messagesId}").UpdateAsync(update);
        }

        public async Task UpdateFcm(string employeeId, string token)
        {
            Dictionary<string, object> fcmValue = new Dictionary<string, object>()
            {
                {"fcmToken",token }
            };
            await _firestoreDb.GetFirestoreDb().Document($"Employees/{employeeId}").UpdateAsync(fcmValue);
        }

        /*   public IEnumerable<Employee> GetEmployees(EmployeeFilter filter)
           {
              foreach(Employee employee in Employees)
               {
                   if (!String.IsNullOrEmpty(filter.Username))
                       if (!employee.Username.Contains(filter.Username)) continue;
                   if (!String.IsNullOrEmpty(filter.FirstName))
                       if (!employee.Firstname.Contains(filter.FirstName)) continue;
                   if (!String.IsNullOrEmpty(filter.LastName))
                       if (!employee.Lastname.Contains(filter.LastName)) continue;
                   if (!String.IsNullOrEmpty(filter.Username))
                       if (!employee.Username.Contains(filter.Username)) continue;
                   if (!String.IsNullOrEmpty(filter.Email))
                       if (!employee.Email.Contains(filter.Email)) continue;

                   FiltredEmployees.Add(employee);

               }
               return FiltredEmployees;
           }
        */
        public async Task<bool>  ValidateUsername(string username)
        {
            var docRef = await _firestoreDb.GetFirestoreDb().Collection("Employees").WhereEqualTo("Username", username).GetSnapshotAsync();
            if (docRef.Count > 0) return false;
            return true;
        }
    }
}
