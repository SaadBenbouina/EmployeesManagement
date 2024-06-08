using EmployeesManagement.Model;

namespace EmployeesManagement.Service.AbsencesService
{
    public class AbsenceService : BaseMethoden<Absence>, IAbsence
    {
        private readonly MyContext _context;

        public AbsenceService(MyContext context) : base(context)
        {
            _context = context;
        }


        public async Task<Absence> Update(int id, Absence absence)
        {
            var itemToUpdate = await _context.Absences.FindAsync(id);
            if (itemToUpdate!= null)
            {
                itemToUpdate.Reason = absence.Reason;
                itemToUpdate.From = absence.From;
                itemToUpdate.To = absence.To;
                itemToUpdate.Approved = absence.Approved;
                await _context.SaveChangesAsync();
                return itemToUpdate;
            }
             throw new KeyNotFoundException($"Absence with ID {id} does not exist.");

        }

        public async Task Approve(int id)
        {
            var itemToApprove = await _context.Absences.FindAsync(id);

            if (itemToApprove != null)
            {
                itemToApprove.Approved = true;
            }
            else
            {
                throw new KeyNotFoundException($"Absence with ID {id} does not exist.");
            }
        }
    }
}
