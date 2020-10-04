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
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddDbContext<RestaurantAppContext>(options => 
                options.UseSqlServer(configuration.GetConnectionString("RestaurantAppContext"))); 
        }
    }
}
