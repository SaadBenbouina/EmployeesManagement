
using StudentPlanManager.Model;

namespace StudentPlanManager.Service.PersonsService
{

    public interface IPerson : IBaseModelService<Person>
    {
        Task<Person> Update(int id, Person person);

    }

}
