using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mission11.API.Models
{
    public class Entertainer
    {
        [Key]
        [Required] // ? Explicitly stating it's required, even though int is non-nullable
        public int EntertainerID { get; set; }

        [Required]
        public string EntStageName { get; set; } = null!; // ? Required

        // Nullable strings (may be null in the database)
        public string? EntSSN { get; set; }
        public string? EntStreetAddress { get; set; }
        public string? EntCity { get; set; }
        public string? EntState { get; set; }
        public string? EntZipCode { get; set; }
        public string? EntPhoneNumber { get; set; }
        public string? EntWebPage { get; set; }
        public string? EntEmailAddress { get; set; }
        public string? DateEntered { get; set; }

        // Navigation properties
        public ICollection<Engagement> Engagements { get; set; } = new List<Engagement>();
        public ICollection<EntertainerMember> Members { get; set; } = new List<EntertainerMember>();
        public ICollection<EntertainerStyle> Styles { get; set; } = new List<EntertainerStyle>();

        // Computed (Not mapped to DB)
        [NotMapped]
        public int BookingCount { get; set; }

        [NotMapped]
        public string? LastBookingDate { get; set; }
    }
}



