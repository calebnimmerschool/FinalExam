using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mission11.API.Models
{
    public class EntertainerMember
    {
        [Key]
        public int Id { get; set; }  // Optional surrogate key if needed for EF Core

        [Required]
        public int EntertainerID { get; set; }

        [Required]
        public int MemberID { get; set; }

        public int? Status { get; set; }

        [ForeignKey("EntertainerID")]
        public Entertainer Entertainer { get; set; }

        [ForeignKey("MemberID")]
        public Member Member { get; set; }
    }
}
