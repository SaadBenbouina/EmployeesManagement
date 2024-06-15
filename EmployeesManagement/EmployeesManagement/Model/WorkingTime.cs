using System;
namespace EmployeesManagement.Model
{
	public class WorkingTime:BaseEntity
	{
		public required string NameOfProject { get; set; }

		public required DateTime From { get; set; }

		public required DateTime To { get; set; }

		public required Adress Adress { get; set; }

	}
}

