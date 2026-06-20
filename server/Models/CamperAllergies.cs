using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace server.Models
{
    [Table("camper_allergies")]
    public class CamperAllergies
    {
        [Key]
        [Column("camper_allergies_id")]
        public int CamperAllergiesId {  get; set; }
        [Column("camper_id")]
        public int CamperId { get; set; }
        [Column("allergy_id")]
        public int AllergyId { get; set; }
        [JsonIgnore]
        public Camper Camper { get; set; }

        public Allergies Allergy { get; set; }
    }
}