using Microsoft.Extensions.DependencyInjection;
using StudentPlanManager.Service.AbsencesService;
using StudentPlanManager.Service.PersonsService;
using StudentPlanManager.Service.AdressesService;
using StudentPlanManager.Service.BusnessTripsService;
using StudentPlanManager.Service.WorkingTimesService;

namespace StudentPlanManager.Extensions
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
