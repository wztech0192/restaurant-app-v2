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
    }
}