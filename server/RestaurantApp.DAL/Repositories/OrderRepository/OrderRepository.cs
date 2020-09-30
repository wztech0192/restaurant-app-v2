using Microsoft.EntityFrameworkCore;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace RestaurantApp.DAL.Repositories
{
    internal class OrderRepository : BaseRepository<Order, int>, IOrderRepository
    {
        public OrderRepository(RestaurantAppContext context): base(context)
        {
        }
    }
}