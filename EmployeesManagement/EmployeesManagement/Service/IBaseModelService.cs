using System;
using Microsoft.EntityFrameworkCore;
using StudentPlanManager.Model;

namespace StudentPlanManager.Service
{

    public interface IBaseModelService<T>
    {
        Task<T> GetById(int id);
        
        Task<IEnumerable<T>> GetAll();

        Task<T> Create(T toCreate);

        Task<T> Delete(int id);

    }
}

