using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantApp.DAL
{
    public interface IContextFactory
    {
        RestaurantAppContext Create();
    }
}
