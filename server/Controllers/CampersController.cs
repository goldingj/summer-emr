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
            var campers = _context.Campers.OrderBy(c => c.LastName).ThenBy(c => c.FirstName).ToList();
            return Ok(campers);
        }

        [HttpGet("{id}")]
        public IActionResult GetCamperById(int id)
        {
            var camper = _context.Campers.FirstOrDefault(c => c.CamperId == id);
            if (camper == null)
            {
                return NotFound();
            }
            return Ok(camper);
        }

        [HttpPost]
        public IActionResult AddCamper(Camper camper)
        {
            _context.Campers.Add(camper);
            _context.SaveChanges();

            return Ok(camper);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCamper(int id, EditCamperDTO updatedInfo)
        {
            var camper = _context.Campers.FirstOrDefault(c => c.CamperId == id);
            if (camper == null)
            {
                return NotFound();
            }
            camper.FirstName = updatedInfo.FirstName;
            camper.LastName = updatedInfo.LastName;
            camper.DateOfBirth = updatedInfo.DateOfBirth;
            camper.GenderId = updatedInfo.GenderId;
            camper.BunkId = updatedInfo.BunkId;
            var link = _context.CamperParents.FirstOrDefault(cp => cp.CamperId == id);

            if (link != null)
            {
                var parent = _context.Parents.FirstOrDefault(p => p.ParentId == link.ParentId);
                if (parent != null)
                {
                    parent.ParentFirstName = updatedInfo.FirstName;
                    parent.ParentLastName = updatedInfo.LastName;
                    parent.PhoneNumber = updatedInfo.PhoneNumber;
                }
            }

            _context.SaveChanges();

            return Ok();
        }
    }
}