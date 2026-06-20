using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            var camper = _context.Campers
                 .Include(ca => ca.CamperAllergies)
                    .ThenInclude(ca => ca.Allergy)
                .FirstOrDefault(c => c.CamperId == id);
            if (camper == null)
            {
                return NotFound();
            }
            return Ok(new
            {
                camper.CamperId,
                camper.FirstName,
                camper.LastName,
                camper.DateOfBirth,
                camper.BunkId,
                camper.GenderId,

                Allergies = camper.CamperAllergies
                    .Select(ca => new
                    {
                        allergyId = ca.Allergy.AllergyId,
                        allergen = ca.Allergy.Allergy
                    }).ToList()
            });
        }

        [HttpPost]
        public IActionResult AddCamper(Camper camper)
        {

            if (string.IsNullOrWhiteSpace(camper.FirstName?.Trim()) || string.IsNullOrWhiteSpace(camper.LastName?.Trim()))
            {
                return BadRequest("First and last name are required.");
            }

            if (camper.GenderId <=0 || camper.BunkId <= 0)
            {
                return BadRequest("Gender and Bunk must be selected.");
            }
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

            if (string.IsNullOrWhiteSpace(updatedInfo.FirstName?.Trim()) || string.IsNullOrWhiteSpace(updatedInfo.LastName?.Trim()))
            {
                return BadRequest("First and last name are required.");
            }

            if (camper.GenderId <= 0 || camper.BunkId <= 0)
            {
                return BadRequest("Gender and Bunk must be selected.");
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

            _context.CamperAllergies.RemoveRange(
                _context.CamperAllergies.Where(ca => ca.CamperId == id)
                );
            if(updatedInfo.AllergyIds != null)
            {
                var newAllergies = updatedInfo.AllergyIds.Select(allergyId => new CamperAllergies
                {
                    CamperId = id,
                    AllergyId = allergyId
                });

                _context.CamperAllergies.AddRange(newAllergies);
            }

            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCamper(int id)
        {
            var camper = _context.Campers.FirstOrDefault(c => c.CamperId == id);

            if(camper == null)
            {
                return NotFound();
            }

            _context.CamperAllergies.RemoveRange(
                _context.CamperAllergies.Where(ca => ca.CamperId == id)
                );

            _context.CamperMedications.RemoveRange(
                _context.CamperMedications.Where(cm => cm.CamperId == id)
                );

            _context.CamperParents.RemoveRange(
                _context.CamperParents.Where(cp => cp.CamperId == id)
                );

            _context.Campers.Remove(camper);
            _context.SaveChanges();

            return Ok();
        }
    }
}