
using EmployeesManagement.Model;

namespace EmployeesManagement.Service.AdressesService
{

    public interface IAdress : IBaseModelService<Adress>
    {
        Task<Adress> Update(int id, Adress adress);

    }

}
