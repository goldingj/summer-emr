using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GendersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GendersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetGenders()
        {
            return Ok(_context.Genders.ToList());
        }
    }
}