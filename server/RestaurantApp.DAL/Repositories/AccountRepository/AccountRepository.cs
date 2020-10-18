using Microsoft.EntityFrameworkCore;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace RestaurantApp.DAL.Repositories
{
    internal class AccountRepository : BaseRepository<Account, int>, IAccountRepository
    {
        public AccountRepository(RestaurantAppContext context): base(context)
        {
        }

        public Account GetAccountWithCard(int id)
        {
            var account = base.Context.Accounts.Include(x => x.Cards).Where(acc => acc.ID == id).FirstOrDefault();
            return account;
        }

        public Account GetByEmail(string email)
        {
            return base.SingleOrDefault(acc => acc.Email == email);
        }
    }
}