using System;
namespace EmployeesManagement.Model
{
	public class Ticket : BaseEntity
    {
		public required string Description { get; set; }

		public required string Title { get; set; }

		public required DateTime Deadline { get; set; }

		public Person? Responsible { get; set; }

		public required Boolean Completed { get; set; }

		public required Boolean Attributed { get; set; }
	}
}

