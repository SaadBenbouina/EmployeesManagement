using EmployeesManagement.Model;

namespace EmployeesManagement.Service.WorkingTimesService
{
    public interface IWorkingTime : IBaseModelService<WorkingTime>
    {
        Task<WorkingTime> Update(int id, WorkingTime workingTime);
    }
}

