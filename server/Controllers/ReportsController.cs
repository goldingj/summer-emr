using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/reports")]
    public class ReportsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ReportsController(AppDbContext context) 
        { 
                _context = context;
        }

        [HttpGet("campers-by-bunk")]
        public IActionResult CampersByCabin()
        {
            var report = _context.Campers
                .Include(c => c.Bunk)
                .Select(c => new
                {
                    CamperName = c.FirstName + " " + c.LastName,
                    BunkName = c.Bunk != null ? c.Bunk.BunkName: "Unassigned"                })
                .OrderBy(x => x.BunkName)
                .ToList();

            return Ok(report);
        }

        [HttpGet("allergies")]
        public IActionResult Allergies()
        {
            var data = _context.CamperAllergies
                .Include(ca => ca.Camper)
                .Include(ca => ca.Allergy)
                .Select(ca => new
                {
                    CamperName = ca.Camper.FirstName + " " + ca.Camper.LastName,
                    AllergyName = ca.Allergy.Allergy
                })
                .ToList();

            return Ok(data);
        }

        [HttpGet("medications")]
        public IActionResult Meds() { 
            var data = _context.CamperMedications
                .Include(cm => cm.Camper)
                .Include(cm => cm.Medication)
                .Select(cm => new
                {
                    CamperName = cm.Camper.FirstName + " " + cm.Camper.LastName,
                    MedicationName = cm.Medication.Name,
                    cm.Dosage,
                    cm.DosageUnit
                })
                .ToList();
            return Ok(data);
        }
    }
}