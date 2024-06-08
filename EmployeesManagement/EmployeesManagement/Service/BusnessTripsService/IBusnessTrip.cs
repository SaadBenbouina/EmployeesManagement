using EmployeesManagement.Model;

namespace EmployeesManagement.Service.BusnessTripsService
{
	public interface IBusnessTrip:IBaseModelService<BusnessTrip>
	{
        Task<BusnessTrip> Update(int id, BusnessTrip busnessTrip);

    }
}
