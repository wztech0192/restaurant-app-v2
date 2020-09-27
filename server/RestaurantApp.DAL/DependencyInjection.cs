using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantApp.DAL
{
    public static class DependencyInjection
    {
        public static void InjectDAL(IServiceCollection services, IConfiguration configuration)
        {
            //todo: pass connection string to context
            //configuration.GetConnectionString("RestaurantAppContext");


            services.AddScoped<IUnitOfWork, UnitOfWork>();

            var test = configuration.GetConnectionString("RestaurantAppContext");

            var connStr = configuration.GetConnectionString("RestaurantAppContext");

            services.AddScoped<IContextFactory, ContextFactory>();

            services.AddDbContext<RestaurantAppContext>(options => options.UseSqlServer(connStr)); 
        }
    }
}
