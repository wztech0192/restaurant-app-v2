using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace RestaurantApp.DAL.Repositories
{
    public interface IOrderRepository : IBaseRepository<Order, int>
    {

    }

}