using System;
using EmployeesManagement.Model;

namespace EmployeesManagement.Service.WorkingTimesService
{
    public class WorkingTimeService : BaseMethoden<WorkingTime>, IWorkingTime
    {
        private readonly MyContext _context;

        public WorkingTimeService(MyContext context) : base(context)
        {
            _context = context;
        }


        public async Task<WorkingTime> Update(int id, WorkingTime workingTime)
        {
            var itemToUpdate = await _context.WorkingTimes.FindAsync(id);
            if (itemToUpdate != null)
            {
                itemToUpdate.NameOfCompany = workingTime.NameOfCompany;
                itemToUpdate.From = workingTime.From;
                itemToUpdate.To = workingTime.To;
                itemToUpdate.Absence = workingTime.Absence;
                itemToUpdate.Adress = workingTime.Adress;
                await _context.SaveChangesAsync();
                return itemToUpdate;
            }
            throw new KeyNotFoundException($"WorkTime with ID {id} does not exist.");

        }
    }
}

