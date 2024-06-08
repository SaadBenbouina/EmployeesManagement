using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EmployeesManagement.Model;
using EmployeesManagement.Service.WorkingTimesService;

namespace EmployeesManagement.Controllers
{
    public class WorkingTimeController : MyBaseApiController, IBaseCrudController<WorkingTime>
    { 
            private readonly IWorkingTime  _workingTime;

            public WorkingTimeController(IWorkingTime workingTimeService)
            {
                _workingTime = workingTimeService;
            }

            [HttpGet]
            public async Task<IEnumerable<WorkingTime>> GetAll()
             => await _workingTime.GetAll();

            // Create
            [HttpPost]
            public async Task<ActionResult<WorkingTime>> Create( WorkingTime dto)
             => Ok(await _workingTime.Create(dto));

            // GetById
            [HttpGet("{id:int}")]
            public async Task<ActionResult<WorkingTime>> GetById(int id)
                => Ok(await _workingTime.GetById(id));

            // Update
            [HttpPut("{id:int}")]
            [ProducesResponseType(StatusCodes.Status204NoContent)]
            [ProducesDefaultResponseType]
            public async Task<ActionResult> Update(int id, WorkingTime workingTime)
            {
                await   _workingTime.Update(id, workingTime);
                return NoContent();
            }

            // Delete
            [HttpDelete("{id:int}")]
            [ProducesResponseType(StatusCodes.Status204NoContent)]
            [ProducesDefaultResponseType]
            public async Task<ActionResult> Delete(int id)
            {
                await _workingTime.Delete(id);
                return NoContent();
            }
    }
}

