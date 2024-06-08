using System;
namespace StudentPlanManager.Model
{
    public class Person : BaseEntity
    {
        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string Salutation { get; set; }

        public required Status Status { get; set; }

        public string? Speciality { get; set; }

        public int AbsenceDay { get; set; }

        public required string Email { get; set; }

        public string? Departement { get; set; }
    }
}

