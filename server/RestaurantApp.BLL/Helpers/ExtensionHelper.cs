using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;

namespace RestaurantApp.BLL.Helpers
{
    internal static class ExtensionHelper
    {
        public static void CreateUpdateDelete<TEntity, TDto, TKey>(
            this IEnumerable<TEntity> entities,
            IEnumerable<TDto> dtos,
            Func<TDto, TKey> dtoKey,
            Func<TEntity, TKey> entityKey,
            Action<TDto, Func<TEntity, TDto, TEntity>> create = null,
            Action<TEntity, TDto> update = null,
            Action<TEntity> delete = null)
        {
            var entityDictionary = entities.ToDictionary(en => entityKey(en));

            Func<TEntity, TDto, TEntity> _update = (entity, dto) => {
                update?.Invoke(entity, dto);
                return entity;
            };

            foreach (var dto in dtos)
            {
                var key = dtoKey(dto);
                //exist in both entities and dtos: should UPDATE entity based on dto
                if (entityDictionary.TryGetValue(dtoKey(dto), out TEntity entity))
                {
                    update?.Invoke(entity, dto);
                    entityDictionary.Remove(key);
                }
                else
                {
                    //exist only in dtos: should CREATE based on dto
                    create?.Invoke(dto, _update);
                }
            };

            if(delete != null)
            {  
                //rest entities not exist in the dto
                foreach (var entity in entityDictionary.Values.ToList())
                {
                    //exist only in entities: should REMOVE entity
                    delete(entity);
                }
            }
          
        }
    }
}
