using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MARController : ControllerBase
    {
        private readonly AppDbContext _context;
        public MARController(AppDbContext context)
        {
            _context = context;
        }

        private List<string> GetDueTimes(string frequency)
        {
            switch (frequency)
            {
                case "QD":
                    return new List<string> { "8:00" };
                case "BID":
                    return new List<string> { "8:00", "20:00" };
                case "TID":
                    return new List<string> { "8:00", "14:00", "20:00" };
                case "QID":
                    return new List<string> { "8:00", "12:00", "16:00", "20:00" };
                default:
                    return new List<string>();
            }
        }

        [HttpGet]
        public IActionResult GetMAR()
        {
            var meds = _context.CamperMedications
                .Include(cm => cm.Camper)
                .Include(cm => cm.Medication)
                .Select(cm => new
                {
                    cm.CamperMedicationId,
                    CamperName = cm.Camper.FirstName + " " + cm.Camper.LastName,
                    MedicationName = cm.Medication.Name,
                    cm.Dosage,
                    cm.DosageUnit,
                    cm.Frequency,
                    cm.Instructions,
                    DueTimes = GetDueTimes(cm.Frequency)
                })
                .ToList();

            return Ok(meds);
        }
    }
}