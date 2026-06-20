using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/allergies")]
    public class AllergiesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AllergiesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllergies()
        {
            var allergies = _context.Allergies.ToList();
            return Ok(allergies);
        }
    }
}