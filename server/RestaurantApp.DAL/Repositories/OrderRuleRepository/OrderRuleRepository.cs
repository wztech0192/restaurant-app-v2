using Microsoft.EntityFrameworkCore;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace RestaurantApp.DAL.Repositories
{
    internal class OrderRuleRepository : BaseRepository<OrderRule, int>, IOrderRuleRepository
    {
        public OrderRuleRepository(RestaurantAppContext context): base(context)
        {
        }
        public OrderRule GetByName(string name)
        {
            return base.Context.OrderRules.FirstOrDefault(x => x.Name.ToLower() == name.ToLower());
        }
    }
}