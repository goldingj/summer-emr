using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("medication_admin_log")]
    public class MedicationAdminLog
    {
        [Key]
        [Column("admin_log_id")]
        public int LogId { get; set; }

        [Column("camper_medication_id")]
        public int CamperMedicationId { get; set; }

        [Column("admin_time")]
        public DateTime AdministeredAt { get; set; } = DateTime.UtcNow;
    }
}