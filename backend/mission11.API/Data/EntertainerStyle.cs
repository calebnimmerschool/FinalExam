using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mission11.API.Models
{
	public class EntertainerStyle
	{
		[Key]
		public int Id { get; set; }  // Optional surrogate key if needed

		[Required]
		public int EntertainerID { get; set; }

		[Required]
		public int StyleID { get; set; }

		public int? StyleStrength { get; set; }

		[ForeignKey("EntertainerID")]
		public Entertainer Entertainer { get; set; }

		// Optional: link to MusicalStyle if modeled
		// public MusicalStyle Style { get; set; }
	}
}
