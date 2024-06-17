using System;
using Microsoft.EntityFrameworkCore;
using EmployeesManagement.Model;

namespace EmployeesManagement.Service.PersonsService
{
    public class PersonService : BaseMethoden<Person>,IPerson
    {
        private readonly MyContext _context;

        public PersonService(MyContext context):base(context)
        {
            _context = context;
        }
       

        public async Task<Ticket> AddTicket(int ticketId, Person person)
        {
            var ticket = await _context.Tickets.FindAsync(ticketId);
            person.Tickets.Add(ticket);
            return ticket;
        }

        public async Task<Person> Update(int id, Person person)
        {
            var itemToUpdate = await _context.Persons.FindAsync(id);

            itemToUpdate.LastName = person.LastName;
            //itemToUpdate.FirstName = person.FirstName;
            //itemToUpdate.Salutation = person.Salutation;
            itemToUpdate.Status = person.Status;
            itemToUpdate.Speciality = person.Speciality;
            itemToUpdate.Email = person.Email;
            itemToUpdate.Departement = person.Departement;
            itemToUpdate.From = person.From;
            itemToUpdate.To = person.To;
            itemToUpdate.Adress = person.Adress;
            itemToUpdate.Tickets = person.Tickets;
            itemToUpdate.WorkStatus = person.WorkStatus;
            itemToUpdate.Absences = person.Absences;
            await _context.SaveChangesAsync();
            return itemToUpdate;
        }
    }
}

