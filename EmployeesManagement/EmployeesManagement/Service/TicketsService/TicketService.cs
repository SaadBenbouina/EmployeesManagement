using System;
using EmployeesManagement.Model;

namespace EmployeesManagement.Service.TicketsService
{
	public class TicketService:BaseMethoden<Ticket>,ITicket
	{
            private readonly MyContext _context;

            public TicketService(MyContext context) : base(context)
            {
                _context = context;
            }


            public async Task<Ticket> Update(int id, Ticket ticket)
            {
                var itemToUpdate = await _context.Tickets.FindAsync(id);
                if (itemToUpdate != null)
                {
                    itemToUpdate.Description = ticket.Description;
                    itemToUpdate.Title = ticket.Title;
                    itemToUpdate.Deadline = ticket.Deadline;
                    itemToUpdate.ResponsibleId = ticket.ResponsibleId;
                    itemToUpdate.Responsible = ticket.Responsible;
                    itemToUpdate.Completed = ticket.Completed;
                    itemToUpdate.Attributed = ticket.Attributed;
                    await _context.SaveChangesAsync();
                    return itemToUpdate;
                }
                throw new KeyNotFoundException($"Ticket with ID {id} does not exist.");

            }

            public async Task<bool> Completed(int ticketID )
            {
                var itemToApprove =  await _context.Tickets.FindAsync(ticketID);
                itemToApprove.Completed = true;
                return true;

            }
        }
}
        
