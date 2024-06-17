using System;
namespace EmployeesManagement.Model
{
	public class BusnessTrip : BaseEntity
    {
        public required string Name { get; set; }

		public required Boolean Alone { get; set; }

        public required Adress Adress { get; set; }

        public required DateTime From { get; set; }

        public required DateTime To { get; set; }

        public ICollection<Person> Persons { get; set; } = new List<Person>();  
    }
}

