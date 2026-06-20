using System.ComponentModel.DataAnnotations.Schema;
namespace server.Models

{
    [Table("campers")]
    public class Camper
    {
        [Column("camper_id")]
        public int CamperId { get; set; }
        [Column("first_name")]
        public required string FirstName { get; set; }
        [Column("last_name")]
        public required string LastName { get; set; }
        [Column("gender")]
        public required int GenderId { get; set; }
        [Column("date_of_birth")]
        public required DateOnly DateOfBirth { get; set; }
        [Column("bunk_id")]
        public int BunkId { get; set; }
        [ForeignKey("BunkId")]
        public Bunks? Bunk { get; set; }
        public List<CamperAllergies> CamperAllergies { get; set; } = new();
    }
}