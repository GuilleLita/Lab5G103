using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Roles;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly RoleService _service;

        public RolesController(RoleService service)
        {
            _service = service;
        }

        // GET: api/Roles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Roles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RoleDto>> GetGetById(Guid id)
        {
            var cat = await _service.GetByIdAsync(new RoleId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/Roles
        [HttpPost]
        public async Task<ActionResult<RoleDto>> Create(CreatingRoleDto dto)
        {
            var cat = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = cat.Id }, cat);
        }

        
        // PUT: api/Roles/5
        [HttpPut("{id}")]
        public async Task<ActionResult<RoleDto>> Update(Guid id, RoleDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var cat = await _service.UpdateAsync(dto);
                
                if (cat == null)
                {
                    return NotFound();
                }
                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/Roles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RoleDto>> SoftDelete(Guid id)
        {
            var cat = await _service.InactivateAsync(new RoleId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return Ok(cat);
        }
        
        // DELETE: api/Roles/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<RoleDto>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new RoleId(id));

                if (cat == null)
                {
                    return NotFound();
                }

                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}