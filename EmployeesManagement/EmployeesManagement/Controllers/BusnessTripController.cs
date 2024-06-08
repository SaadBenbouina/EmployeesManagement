using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EmployeesManagement.Model;
using EmployeesManagement.Service.BusnessTripsService;

namespace EmployeesManagement.Controllers
{
    public class BusnessTripController : MyBaseApiController, IBaseCrudController<BusnessTrip>
    {
        private readonly IBusnessTrip _busnessTripService;

        public BusnessTripController(IBusnessTrip busnessTrip)
        {
            _busnessTripService = busnessTrip;
        }

        [HttpGet]
        public async Task<IEnumerable<BusnessTrip>> GetAll()
         => await _busnessTripService.GetAll();

        // Create
        [HttpPost]
        public async Task<ActionResult<BusnessTrip>> Create(BusnessTrip dto)
         => Ok(await _busnessTripService.Create(dto));

        // GetById
        [HttpGet("{id:int}")]
        public async Task<ActionResult<BusnessTrip>> GetById(int id)
            => Ok(await _busnessTripService.GetById(id));

        // Update
        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Update(int id, BusnessTrip busnessTrip)
        {
            await _busnessTripService.Update(id, busnessTrip);
            return NoContent();
        }

        // Delete
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Delete(int id)
        {
            await _busnessTripService.Delete(id);
            return NoContent();
        }
    }
}
