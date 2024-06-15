using System;
using System.ComponentModel.DataAnnotations;

namespace EmployeesManagement.Model
{
    public abstract class BaseEntity
    {
        [Required]
        public int Id { get; set; }
    }
}

