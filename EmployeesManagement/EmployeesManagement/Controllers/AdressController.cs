using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EmployeesManagement.Model;
using EmployeesManagement.Service.AbsencesService;
using EmployeesManagement.Service.AdressesService;

namespace EmployeesManagement.Controllers
{
    public class AdressController : MyBaseApiController, IBaseCrudController<Adress>
    {
        private readonly IAdress _adressService;

        public AdressController(IAdress adressService)
        {
            _adressService = adressService;
        }

        [HttpGet]
        public async Task<IEnumerable<Adress>> GetAll()
         => await _adressService.GetAll();

        // Create
        [HttpPost]
        public async Task<ActionResult<Adress>> Create(Adress dto)
         => Ok(await _adressService.Create(dto));

        // GetById
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Adress>> GetById(int id)
            => Ok(await _adressService.GetById(id));

        // Update
        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Update(int id, Adress adress)
        {
            await _adressService.Update(id, adress);
            return NoContent();
        }

        // Delete
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Delete(int id)
        {
            await _adressService.Delete(id);
            return NoContent();
        }
    }
}
