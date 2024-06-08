using System;
using Microsoft.EntityFrameworkCore;
using StudentPlanManager.Model;

namespace StudentPlanManager.Service.PersonsService
{
    public class PersonService : BaseMethoden<Person>,IPerson
    {
        private readonly MyContext _context;

        public PersonService(MyContext context):base(context)
        {
            _context = context;
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
            await _context.SaveChangesAsync();
            return itemToUpdate;
        }
    }
}

