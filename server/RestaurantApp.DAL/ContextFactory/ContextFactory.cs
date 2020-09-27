using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantApp.DAL
{
    internal sealed class ContextFactory: IContextFactory
    {

        public RestaurantAppContext Create()
        {
            return new RestaurantAppContext();
        }
    }
}
