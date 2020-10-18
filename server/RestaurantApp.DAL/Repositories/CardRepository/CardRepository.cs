using Microsoft.EntityFrameworkCore;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace RestaurantApp.DAL.Repositories
{
    internal class CardRepository : BaseRepository<Card, int>, ICardRepository
    {
        public CardRepository(RestaurantAppContext context) : base(context)
        {
        }
    }
}