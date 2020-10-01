using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingManagement.Models.ValidationAttributes
{
    public class DepartamentAttribute : ValidationAttribute
    {
        private readonly string[] _validDepartaments = { "Departament1", "Departament2", "Departament3" };
      
        public string GetErrorMessage() =>
      $" Departament value is not a valid ";
        protected override ValidationResult IsValid(object value,
      ValidationContext validationContext)
        {
            var employee= (Employee)validationContext.ObjectInstance;

            if (!_validDepartaments.Contains(employee.Departament))
            {
                return new ValidationResult(GetErrorMessage());
            }

            return ValidationResult.Success;
        }

    }
}
