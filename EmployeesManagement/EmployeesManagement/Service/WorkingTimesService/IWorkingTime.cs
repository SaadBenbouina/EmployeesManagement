using StudentPlanManager.Model;

namespace StudentPlanManager.Service.WorkingTimesService
{
    public interface IWorkingTime : IBaseModelService<WorkingTime>
    {
        Task<WorkingTime> Update(int id, WorkingTime workingTime);
    }
}

