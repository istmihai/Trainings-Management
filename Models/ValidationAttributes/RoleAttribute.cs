using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingManagement.Models.ValidationAttributes
{
    public class RoleAttribute : ValidationAttribute
    {
        private readonly string[] _validRoles = { "Employee", "Admin", };

        public string GetErrorMessage() =>
      $" Role value is not a valid ";
        protected override ValidationResult IsValid(object value,
      ValidationContext validationContext)
        {
            var employee = (Employee)validationContext.ObjectInstance;

            if (!_validRoles.Contains(employee.Role))
            {
                return new ValidationResult(GetErrorMessage());
            }

            return ValidationResult.Success;
        }

    }
}
