using StudentPlanManager.Model;

namespace StudentPlanManager.Service.TicketsService
{
	public interface ITicket:IBaseModelService<Ticket>
	{
        Task<Ticket> Update(int id, Ticket ticket);

        Task<bool> Completed(int id);
    }
}

