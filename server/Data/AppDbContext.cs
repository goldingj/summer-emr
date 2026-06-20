using Microsoft.EntityFrameworkCore;
using server.Models;
namespace server.Data
{

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Camper> Campers { get; set; }
        public DbSet<Parent> Parents { get; set; }
        public DbSet<CamperParents> CamperParents { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<Bunks> Bunks { get; set; }
        public DbSet<Medications> Medications { get; set; }
        public DbSet<CamperMedications> CamperMedications { get; set; }
        public DbSet<NursesPosts> NursesPosts { get; set; }
        public DbSet<Allergies> Allergies { get; set; }
        public DbSet<CamperAllergies> CamperAllergies { get; set; }
        public DbSet<MedicationAdminLog> MedicationAdminLog { get; set; }
    

    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CamperAllergies>()
                .HasOne(ca => ca.Camper)
                .WithMany(c => c.CamperAllergies)
                .HasForeignKey(ca => ca.CamperId);

            modelBuilder.Entity<CamperAllergies>()
                .HasOne(ca => ca.Allergy)
                .WithMany()
                .HasForeignKey(ca => ca.AllergyId);
        }
    } 
}