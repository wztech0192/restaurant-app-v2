using RestaurantApp.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantApp.DAL
{
    interface IUnitOfWork
    {
        IAccountRepository AccountRepository { get; }
        IMenuRepository MenuRepository { get; }
        IOrderRepository OrderRepository { get; }

    }
}
