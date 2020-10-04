using Microsoft.EntityFrameworkCore;
using RestaurantApp.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantApp.DAL
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {

        private readonly RestaurantAppContext _context;

        public UnitOfWork(RestaurantAppContext context)
        {
            _context = context;

            Accounts = new AccountRepository(_context);
            Menus = new MenuRepository(_context);
            Orders = new OrderRepository(_context);
        }

        public IAccountRepository Accounts { get; private set; }
        public IMenuRepository Menus { get; private set; }
        public IOrderRepository Orders { get; private set; }

        public int Complete()
        {
            return _context.SaveChanges();
        }


        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
