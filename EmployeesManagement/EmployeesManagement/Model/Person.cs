﻿using System;
namespace EmployeesManagement.Model
{
    public class Person : BaseEntity
    {
        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string Salutation { get; set; }

        public required Status Status { get; set; }

        public ICollection<Absence>? Absences { get; set; } = new List<Absence>();

        public string? Speciality { get; set; }

        public required string Email { get; set; }

        public required string  Departement { get; set; }

        public ICollection<Ticket>? Tickets { get; set; } = new List<Ticket>();

        public  WorkingTime? WorkInfo { get; set; }

        public BusnessTrip? Trip { get; set; }

        public required WorkStatus WorkStatus { get; set; }
    }
}

