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

        public UnitOfWork(IContextFactory contextFactory)
        {
            _context = contextFactory.Create();

            AccountRepository = new AccountRepository(_context);
            MenuRepository = new MenuRepository(_context);
            OrderRepository = new OrderRepository(_context);
        }

        public IAccountRepository AccountRepository { get; private set; }
        public IMenuRepository MenuRepository { get; private set; }
        public IOrderRepository OrderRepository { get; private set; }

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
