using System;
namespace EmployeesManagement.Model
{
	public class WorkingTime:BaseEntity
	{
		public required string NameOfCompany { get; set; }

		public required DateTime From { get; set; }

		public required DateTime To { get; set; }

		public required Adress Adress { get; set; }

		public Adress? Absence { get; set; }
	}
}

