using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantApp.DAL.DependencyInjection
{
    public static class DALInjection
    {
        public static void Inject(IServiceCollection services, IConfiguration configuration)
        {
            //todo: pass connection string to context
            //configuration.GetConnectionString("RestaurantAppContext");


            services.AddScoped<IUnitOfWork, UnitOfWork>();

            var connStr = configuration.GetConnectionString("RestaurantAppContext");

            services.AddScoped<IContextFactory>(c => new ContextFactory(connStr));

            services.AddDbContext<RestaurantAppContext>(options => options.UseSqlServer(connStr)); 
        }
    }
}
