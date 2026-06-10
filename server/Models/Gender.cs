using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("gender")]
    public class Gender
    {
        [Column("gender_id")]
        public int GenderId { get; set; }
        [Column("name")]
        public required string GenderName { get; set; } = string.Empty;
    }
}