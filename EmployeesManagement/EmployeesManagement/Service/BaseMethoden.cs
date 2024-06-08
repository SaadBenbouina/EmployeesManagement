using System;
using Microsoft.EntityFrameworkCore;
using StudentPlanManager.Model;

namespace StudentPlanManager.Service
{
	public class BaseMethoden<T> : IBaseModelService<T> where T : class
    {
        private readonly MyContext _context;

        public BaseMethoden(MyContext context)
        {
            _context = context;
        }

        public async Task<T> Create(T itemToCreate)
        {
            _context.Set<T>().Add(itemToCreate);
            await _context.SaveChangesAsync();
            return itemToCreate;
        }

        public async Task<T> GetById(int id)
        {
            // 1. Generate query
            return await _context.Set<T>().FindAsync(id);
        }

        public async  Task<T> Delete(int id)
        {
            var itemToRemove = await GetById(id);
            _context.Set<T>().Remove(itemToRemove);
            await _context.SaveChangesAsync();
            return itemToRemove;
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            // 1. Generate query
            var resp = _context.Set<T>();

            // 2. Call to database
            var list = resp.ToListAsync();

            // 3. await result from database
            var materializedResult = await list;
            return materializedResult;
        }
    }
}


