﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentPlanManager.Model;
using StudentPlanManager.Service.PersonsService;

namespace StudentPlanManager.Controllers
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
