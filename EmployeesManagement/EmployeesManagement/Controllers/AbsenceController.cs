using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EmployeesManagement.Model;
using EmployeesManagement.Service.AbsencesService;

namespace EmployeesManagement.Controllers
{
    public class AbsencesController : MyBaseApiController, IBaseCrudController<Absence>
    {
        private readonly IAbsence _absenceService;

        public AbsencesController(IAbsence absenceService)
        {
            _absenceService = absenceService;
        }

        [HttpGet]
        public async Task<IEnumerable<Absence>> GetAll()
         => await _absenceService.GetAll();

        // Create
        [HttpPost]
        public async Task<ActionResult<Absence>> Create(Absence dto)
         => Ok(await _absenceService.Create(dto));

        // GetById
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Absence>> GetById(int id)
            => Ok(await _absenceService.GetById(id));

        // Update
        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Update(int id, Absence absence)
        {
            await _absenceService.Update(id, absence);
            return NoContent();
        }

        // Approve
        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Approve(int id)
        {
            await _absenceService.Approve(id);
            return NoContent();
        }

        // Delete
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Delete(int id)
        {
            await _absenceService.Delete(id);
            return NoContent();
        }
    }
}
