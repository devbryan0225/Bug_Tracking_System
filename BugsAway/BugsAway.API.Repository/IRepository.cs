using System;
using System.Collections.Generic;

namespace BugsAway.API.Repository
{
    public interface IRepository<T> : IDisposable
    {
        IEnumerable<T> GetAll();
        T GetEntityByID(int id);
        void Update(int id, T entity);
        void Create(T entity);
        void Delete(int id);

        void Save();
    }
}

