using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantApp.DAL
{
    internal sealed class ContextFactory: IContextFactory
    {
        private readonly string _connStr;

        public ContextFactory(string connStr)
        {
            this._connStr = connStr;
        }

        public RestaurantAppContext Create()
        {
            return new RestaurantAppContext(_connStr);
        }
    }
}
