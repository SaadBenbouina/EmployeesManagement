using global::StudentPlanManager.Model;

namespace StudentPlanManager.Service.AbsencesService
{

    public interface IAbsence : IBaseModelService<Absence>
    {
        Task<Absence> Update(int id, Absence absence);

        Task Approve(int id );
    }

}
