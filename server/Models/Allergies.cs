using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace server.Models
{
    [Table("allergies")]
    public class Allergies
    {
        [Key]
        [Column("allergy_id")]
        public int AllergyId { get; set; }
        [Column("allergen")]
        public string Allergy {  get; set; }
    }
}