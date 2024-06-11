using System;
namespace EmployeesManagement.Model
{
	public class BusnessTrip : BaseEntity
    {
        public required string Name { get; set; }

		public required Boolean Alone { get; set; }

		public required WorkingTime WorkInfo { get; set; }

		public required int BusnessTripId { get; set; }

        public ICollection<Person> Persons { get; set; } = new List<Person>();  
    }
}

