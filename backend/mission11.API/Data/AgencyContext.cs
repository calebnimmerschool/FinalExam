using Microsoft.EntityFrameworkCore;
using mission11.API.Models;

namespace mission11.API.Data
{
    public class AgencyContext : DbContext
    {
        public AgencyContext(DbContextOptions<AgencyContext> options) : base(options) { }

        public DbSet<Entertainer> Entertainers { get; set; }
        public DbSet<Engagement> Engagements { get; set; }
        public DbSet<EntertainerMember> EntertainerMembers { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<EntertainerStyle> EntertainerStyles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // PRIMARY KEYS
            modelBuilder.Entity<Entertainer>().HasKey(e => e.EntertainerID);
            modelBuilder.Entity<Engagement>().HasKey(e => e.EngagementNumber);
            modelBuilder.Entity<Member>().HasKey(m => m.MemberID);

            // COMPOSITE KEYS
            modelBuilder.Entity<EntertainerMember>()
                .HasKey(em => new { em.EntertainerID, em.MemberID });

            modelBuilder.Entity<EntertainerStyle>()
                .HasKey(es => new { es.EntertainerID, es.StyleID });

            // RELATIONSHIPS
            modelBuilder.Entity<EntertainerMember>()
                .HasOne(em => em.Entertainer)
                .WithMany(e => e.Members)
                .HasForeignKey(em => em.EntertainerID);

            modelBuilder.Entity<EntertainerMember>()
                .HasOne(em => em.Member)
                .WithMany(m => m.EntertainerMembers)
                .HasForeignKey(em => em.MemberID);

            modelBuilder.Entity<EntertainerStyle>()
                .HasOne(es => es.Entertainer)
                .WithMany(e => e.Styles)
                .HasForeignKey(es => es.EntertainerID);

            modelBuilder.Entity<Engagement>()
                .HasOne(e => e.Entertainer)
                .WithMany(en => en.Engagements)
                .HasForeignKey(e => e.EntertainerID);
        }
    }
}



