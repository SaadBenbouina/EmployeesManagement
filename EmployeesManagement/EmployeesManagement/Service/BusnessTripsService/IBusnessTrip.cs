using StudentPlanManager.Model;

namespace StudentPlanManager.Service.BusnessTripsService
{
	public interface IBusnessTrip:IBaseModelService<BusnessTrip>
	{
        Task<BusnessTrip> Update(int id, BusnessTrip busnessTrip);

    }
}
