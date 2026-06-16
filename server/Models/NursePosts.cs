
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
	[Table("nurse_posts")]
	public class NursesPosts
	{
		[Key]
		[Column("post_id")]
		public int NursePostId { get; set; }
		[Column("nurse_message")]
		public string NurseMessage { get; set; }
		[Column("created")]
		public DateTime CreatedAt { get; set; }
	}
}