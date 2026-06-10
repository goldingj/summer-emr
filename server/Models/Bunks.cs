using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace server.Models

{
    [Table("bunks")]
    public class Bunks
    {
        [Key]
        [Column("bunk_id")]
        public int BunkId { get; set; }
        [Column("bunk_name")]
        public required string BunkName { get; set; } = string.Empty;
    }
}