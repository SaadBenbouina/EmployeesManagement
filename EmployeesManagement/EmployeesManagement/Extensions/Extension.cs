using Microsoft.Extensions.DependencyInjection;
using EmployeesManagement.Service.AbsencesService;
using EmployeesManagement.Service.PersonsService;
using EmployeesManagement.Service.AdressesService;
using EmployeesManagement.Service.BusnessTripsService;
using EmployeesManagement.Service.WorkingTimesService;

namespace EmployeesManagement.Extensions
{
    public static class Extension
    {
        public static IServiceCollection MyServiceExtensions(this IServiceCollection services)
        {
            services.AddTransient<IPerson, PersonService>();
            services.AddTransient<IAbsence, AbsenceService>();
            services.AddTransient<IAdress, AdressService>();
            services.AddTransient<IBusnessTrip, BusnessTripService>();
            services.AddTransient<IWorkingTime, WorkingTimeService>();
            return services;
        }
    }
}
