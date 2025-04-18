using System.ComponentModel.DataAnnotations;

namespace mission11.API.Models
{
    public class Member
    {
        [Key]
        public int MemberID { get; set; }

        [Required]
        public string MbrFirstName { get; set; }

        public string MbrLastName { get; set; }
        public string MbrPhoneNumber { get; set; }
        public string Gender { get; set; }

        public ICollection<EntertainerMember> EntertainerMembers { get; set; }
    }
}
