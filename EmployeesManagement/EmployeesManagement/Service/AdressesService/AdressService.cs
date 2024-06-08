using System;
using EmployeesManagement.Model;

namespace EmployeesManagement.Service.AdressesService
{
        public class AdressService : BaseMethoden<Adress>, IAdress
        {
            private readonly MyContext _context;

            public AdressService(MyContext context) : base(context)
            {
                _context = context;
            }


            public async Task<Adress> Update(int id, Adress adress)
            {
                var itemToUpdate = await _context.Adresses.FindAsync(id);
                if (itemToUpdate != null)
                {
                    itemToUpdate.State = adress.State;
                    itemToUpdate.City = adress.City;
                    itemToUpdate.Street = adress.Street;
                    itemToUpdate.PostalCode = adress.PostalCode;
                    itemToUpdate.Raum = adress.Raum;
                    itemToUpdate.Country = adress.Country;
                    await _context.SaveChangesAsync();
                    return itemToUpdate;
                }
                throw new KeyNotFoundException($"Adress with ID {id} does not exist.");

            }


        }
}

