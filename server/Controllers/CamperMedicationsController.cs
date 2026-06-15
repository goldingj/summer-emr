using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CamperMedicationsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CamperMedicationsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("camper/{camperId}")]
        public IActionResult GetCamperMed(int camperId)
        {
            var meds = _context.CamperMedications
                .Include(cm => cm.Medication)
                .Where(cm => cm.CamperId == camperId)
                .Select(cm => new
                {
                    cm.CamperMedicationId,
                    MedicationName = cm.Medication.Name,
                    cm.Dosage,
                    cm.DosageUnit,
                    cm.Frequency,
                    cm.Instructions
                })
                .ToList();
            return Ok(meds);
        }

        [HttpPost]
        public IActionResult AssignMedicationToCamper(CamperMedicationDTO dto)
        {
            Console.WriteLine("POST HIT");
            var camperMedication = new CamperMedications
            {
                CamperId = dto.CamperId,
                MedicationId = dto.MedicationId,
                Dosage = dto.Dosage,
                DosageUnit = dto.DosageUnit,
                Frequency = dto.Frequency,
                Instructions = dto.Instructions
            };
            
            _context.CamperMedications.Add(camperMedication);
            _context.SaveChanges();
            return Ok(camperMedication);
        }
    }
}