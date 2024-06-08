
using StudentPlanManager.Model;

namespace StudentPlanManager.Service.AdressesService
{

    public interface IAdress : IBaseModelService<Adress>
    {
        Task<Adress> Update(int id, Adress adress);

    }

}
