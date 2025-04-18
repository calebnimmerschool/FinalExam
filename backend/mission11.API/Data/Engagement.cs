using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace mission11.API.Models
{
    public class Engagement
    {
        [Key]
        [Required]
        public int EngagementNumber { get; set; }

        [Required]
        public string StartDate { get; set; } = null!;

        [Required]
        public string EndDate { get; set; } = null!;

        [Required]
        public string StartTime { get; set; } = null!;

        [Required]
        public string StopTime { get; set; } = null!;

        public decimal? ContractPrice { get; set; }

        public int? CustomerID { get; set; }
        public int? AgentID { get; set; }

        [Required]
        public int EntertainerID { get; set; }

        [ForeignKey("EntertainerID")]
        [JsonIgnore] // ? Prevent circular reference during JSON serialization
        public Entertainer Entertainer { get; set; } = null!;
    }
}


