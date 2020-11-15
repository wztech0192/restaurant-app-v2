using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace RestaurantApp.DAL.Repositories
{
    public interface IAccountRepository : IBaseRepository<Account, int>
    {
        Account GetByPhone(string phone);
    }

}