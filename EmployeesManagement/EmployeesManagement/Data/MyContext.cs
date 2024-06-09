using EmployeesManagement.Model;
using Microsoft.EntityFrameworkCore;


    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options)
            : base(options)
        {
        }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Define the relationship between Person and Tickets
        modelBuilder.Entity<Person>()
            .HasMany(p => p.Tickets)
            .WithOne(t => t.Responsible);

        // Define the relationship between Person and WorkingTime
        modelBuilder.Entity<Person>()
            .HasOne(p => p.WorkInfo)
            .WithMany()
            .IsRequired();
    }


    public DbSet<Absence> Absences { get; set; }

    public DbSet<Adress> Adresses { get; set; }

    public DbSet<Person> Persons { get; set; }

    public DbSet<BusnessTrip> BusnessTrips { get; set; }

     public DbSet<WorkingTime> WorkingTimes { get; set; }

     public DbSet<Ticket> Tickets { get; set; }
    }
