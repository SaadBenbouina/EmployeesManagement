using EmployeesManagement.Model;

namespace EmployeesManagement.Service.BusnessTripsService
{
    public class BusnessTripService : BaseMethoden<BusnessTrip>, IBusnessTrip
    {
        private readonly MyContext _context;

        public BusnessTripService(MyContext context) : base(context)
        {
            _context = context;
        }


        public async Task<BusnessTrip> Update(int id, BusnessTrip busnessTrip)
        {
            var itemToUpdate = await _context.BusnessTrips.FindAsync(id);
            itemToUpdate.Name = busnessTrip.Name;
            itemToUpdate.Alone = busnessTrip.Alone;
            itemToUpdate.Persons = busnessTrip.Persons;
            itemToUpdate.AdressId = busnessTrip.AdressId;
            itemToUpdate.From = busnessTrip.From;
            itemToUpdate.To = busnessTrip.To;
            itemToUpdate.Adress = busnessTrip.Adress;
            await _context.SaveChangesAsync();
            return itemToUpdate;
        }
    }
}

