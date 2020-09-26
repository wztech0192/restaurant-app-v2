using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace RestaurantApp.DAL.Repositories
{
    public interface IBaseRepository<TEntity, TKey> where TEntity : class
    {

        public TEntity Get(TKey id);

        public IEnumerable<TEntity> GetAll();

        public IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);

        public TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate);

        public void Add(TEntity entity);

        public void AddRange(IEnumerable<TEntity> entities);

        public void Remove(TEntity entity);

        public void RemoveRange(IEnumerable<TEntity> entities);
    }

}