using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CamperAllergiesController  : ControllerBase
    {
        private readonly AppDbContext _context;
        public CamperAllergiesController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public IActionResult AddCamperAllergies([FromBody] CamperAllergyDTO dto)
        {
            foreach (var allergyId in dto.AllergyIds)
            {
                _context.CamperAllergies.Add(new CamperAllergies
                {
                    CamperId = dto.CamperId,
                    AllergyId = allergyId
                });
            }
            _context.SaveChanges();
            return Ok();
        }
    }
}