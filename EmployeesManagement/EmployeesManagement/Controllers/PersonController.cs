using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EmployeesManagement.Model;
using EmployeesManagement.Service.PersonsService;

namespace EmployeesManagement.Controllers
{
    public class PersonsController : MyBaseApiController, IBaseCrudController<Person>
    {
        private readonly IPerson _personService;

        public PersonsController(IPerson personService)
        {
            _personService = personService;
        }

        [HttpGet]
        public async Task<IEnumerable<Person>> GetAll()
         => await _personService.GetAll();

        // Create
        [HttpPost]
        public async Task<ActionResult<Person>> Create(Person dto)
         => Ok(await _personService.Create(dto));

        // GetById
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Person>> GetById(int id)
            => Ok(await _personService.GetById(id));

        // Update
        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Update(int id, Person person)
        {
            await _personService.Update(id, person);
            return NoContent();
        }

        // AddWorkingInfo
        [HttpPut("AddWorkingInfo/{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> AddWorkingInfo(int workingTimeId, Person person)
        {
            await _personService.AddWorkingInfo(workingTimeId, person);
            return NoContent();
        }

        // AddTicket
        [HttpPut("AddTicket/{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> AddTicket(int ticketId, Person person)
        {
            await _personService.AddTicket(ticketId, person);
            return NoContent();
        }

        // Delete
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Delete(int id)
        {
            await _personService.Delete(id);
            return NoContent();
        }
    }
}
