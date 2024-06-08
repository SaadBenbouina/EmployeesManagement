using EmployeesManagement.Model;
using Microsoft.EntityFrameworkCore;


    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options)
            : base(options)
        {
        }
        public DbSet<Absence> Absences { get; set; }

        public DbSet<Adress> Adresses { get; set; }

        public DbSet<Person> Persons { get; set; }

        public DbSet<BusnessTrip> BusnessTrips { get; set; }

        public DbSet<WorkingTime> WorkingTimes { get; set; }

        public DbSet<Ticket> Tickets { get; set; }
}
