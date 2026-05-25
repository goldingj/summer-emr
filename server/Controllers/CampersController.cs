using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CampersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CampersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetCampers()
        {
            var campers = _context.Campers.OrderBy(c => c.lastName).ThenBy(c => c.firstName).ToList();
            return Ok(campers);
        }

        [HttpPost]
        public IActionResult AddCamper(Camper camper)
        {
            _context.Campers.Add(camper);
            _context.SaveChanges();

            return Ok(camper);
        }
    }
}