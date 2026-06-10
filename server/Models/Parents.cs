using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("parent")]
    public class Parent
    {
        [Column("parent_id")]
        public int ParentId { get; set; }
        [Column("first_name")]
        public required string ParentFirstName { get; set; }
        [Column("last_name")]
        public required string ParentLastName { get; set; }
        [Column("phone")]
        public required string PhoneNumber { get; set; }
    }
}