using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MedicationsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllMedications()
        {
            var medications = _context.Medications.ToList();
            return Ok(medications);
        }

        [HttpGet("{id}")]
        public IActionResult GetMedicationById(int id)
        {
            var medication = _context.Medications.Find(id);
            if (medication == null)
            {
                return NotFound();
            }
            return Ok(medication);
        }
    }   
}