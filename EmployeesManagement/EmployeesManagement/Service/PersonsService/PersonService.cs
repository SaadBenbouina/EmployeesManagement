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
        public async Task<WorkingTime> AddWorkingInfo(int workingTimeId, Person person)
        {
            var workingInfo = await _context.WorkingTimes.FindAsync(workingTimeId);
            person.WorkInfo = workingInfo;
            return workingInfo;
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
            itemToUpdate.AbsenceDay = person.AbsenceDay;
            itemToUpdate.Email = person.Email;
            itemToUpdate.Departement = person.Departement;
            itemToUpdate.WorkInfo = person.WorkInfo;
            itemToUpdate.Tickets = person.Tickets;
            await _context.SaveChangesAsync();
            return itemToUpdate;
        }
    }
}

