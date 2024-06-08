using System;
namespace EmployeesManagement.Model
{
	public class Ticket
	{
		public required string Description { get; set; }

		public required string Title { get; set; }

		public required DateTime Deadline { get; set; }

		public required int TicketID { get; set; }

		public int? ResponsibleId { get; set; }

		public required Boolean Completed { get; set; }

		public required Boolean Attributed { get; set; }
	}
}

