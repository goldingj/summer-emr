using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CamperParentController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CamperParentController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public IActionResult AddCamperParent(CamperParents camperParent)
        {
            _context.CamperParents.Add(camperParent);
            _context.SaveChanges();
            return Ok(camperParent);
        }
        [HttpGet("camper/{camperId}")]
        public IActionResult GetParentByCamperId(int camperId)
        {
            Console.WriteLine($"Looking for camper with ID {camperId}");

            var link = _context.CamperParents.FirstOrDefault(cp => cp.CamperId == camperId);

            if (link == null)
            {
                return Ok(null);
            }
            Console.WriteLine($"Found Parent Id {link.ParentId}");

            var parent = _context.Parents.FirstOrDefault(p => p.ParentId == link.ParentId);

            if (parent == null)
            {
                Console.WriteLine("Parent record not found");
                return NotFound();
            }
            Console.WriteLine($"Parent found");

            return Ok(parent);
        }
    }
}