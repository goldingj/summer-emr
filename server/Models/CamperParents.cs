using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("camper_parents")]
    public class CamperParents
    {
        
        [Key]
        [Column ("camper_parent_id")]
        public int CamperParentId { get; set; }
       
        [Column ("camper_id")]
        public int CamperId { get; set; }
        
        [Column ("parent_id")]
        public int ParentId { get; set; }
    }
}