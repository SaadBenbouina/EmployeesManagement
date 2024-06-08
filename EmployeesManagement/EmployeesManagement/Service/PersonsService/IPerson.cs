
using EmployeesManagement.Model;

namespace EmployeesManagement.Service.PersonsService
{

    public interface IPerson : IBaseModelService<Person>
    {
        Task<Person> Update(int id, Person person);

    }

}
