
using Microsoft.AspNetCore.Mvc;

namespace EmployeesManagement.Controllers
{
    public interface IBaseCrudController<T>
    {
        Task<IEnumerable<T>> GetAll();
        Task<ActionResult<T>> GetById(int id);
        Task<ActionResult<T>> Create(T entity);
        Task<ActionResult> Update(int id, T entity);
        Task<ActionResult> Delete(int id);
    }
}
