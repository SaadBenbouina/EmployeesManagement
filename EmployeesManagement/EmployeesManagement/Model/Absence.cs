using System;
namespace EmployeesManagement.Model
{
	public class Absence:BaseEntity
	{
        public required string Reason { get; set; }

		public required DateTime From { get; set; }

        public required DateTime To { get; set; }

        public  required bool Approved { get; set; }

    }
}

