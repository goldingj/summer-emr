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
        [Column("date_of_birth")]
        public DateTime DateOfBirth { get; set; }
    }
}