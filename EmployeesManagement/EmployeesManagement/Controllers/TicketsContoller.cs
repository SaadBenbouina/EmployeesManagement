using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EmployeesManagement.Model;
using EmployeesManagement.Service.TicketsService;

namespace EmployeesManagement.Controllers
{
	public class TicketsContoller: MyBaseApiController, IBaseCrudController<Ticket>
    {
            private readonly ITicket _ticketService;

            public TicketsContoller(ITicket ticket)
            {
            _ticketService = ticket;
            }

            [HttpGet]
            public async Task<IEnumerable<Ticket>> GetAll()
             => await _ticketService.GetAll();

            // Create
            [HttpPost]
            public async Task<ActionResult<Ticket>> Create(Ticket dto)
             => Ok(await _ticketService.Create(dto));

            // GetById
            [HttpGet("{id:int}")]
            public async Task<ActionResult< Ticket>> GetById(int id)
                => Ok(await _ticketService.GetById(id));

            // Update
            [HttpPut("{id:int}")]
            [ProducesResponseType(StatusCodes.Status204NoContent)]
            [ProducesDefaultResponseType]
            public async Task<ActionResult> Update(int id, Ticket ticket)
            {
                await _ticketService.Update(id, ticket);
                return NoContent();
            }

              // Completed
            [HttpPut("{id:int}")]
            [ProducesResponseType(StatusCodes.Status204NoContent)]
            [ProducesDefaultResponseType]
            public async Task<ActionResult> Completed(int id)
            {
                await _ticketService.Completed(id);
                return NoContent();
            }

            // Delete
            [HttpDelete("{id:int}")]
            [ProducesResponseType(StatusCodes.Status204NoContent)]
            [ProducesDefaultResponseType]
            public async Task<ActionResult> Delete(int id)
            {
                await _ticketService.Delete(id);
                return NoContent();
            }
        }
    }


