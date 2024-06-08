using EmployeesManagement.Model;

namespace EmployeesManagement.Service.TicketsService
{
	public interface ITicket:IBaseModelService<Ticket>
	{
        Task<Ticket> Update(int id, Ticket ticket);

        Task<bool> Completed(int id);
    }
}

