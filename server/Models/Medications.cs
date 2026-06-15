using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    [Table("medications")]
    public class Medications
    {
        [Key]
        [Column("medication_id")]
        public int MedicationId { get; set; }
        [Column("medication_name")]
        public required string Name { get; set; } = string.Empty;
    }
}