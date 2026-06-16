using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    [Table("camper_medications")]
    public class CamperMedications
    {
        public Medications Medication { get; set; }
        public Camper Camper { get; set; }
        [Key]
        [Column("camper_medication_id")]
        public int CamperMedicationId { get; set; }
        [Column("camper_id")]
        public int CamperId { get; set; }
        [Column("medication_id")]
        public int MedicationId { get; set; }
        [Column("dosage")]
        public required string Dosage { get; set; } = string.Empty;
        [Column("dosage_unit")]
        public string DosageUnit { get; set; }
        [Column("frequency")]
        public string Frequency { get; set; }
        [Column("instructions")]
        public string Instructions { get; set; }
    }
}