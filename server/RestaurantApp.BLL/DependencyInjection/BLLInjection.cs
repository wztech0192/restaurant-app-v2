using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RestaurantApp.BLL.Services;
using RestaurantApp.DAL.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantApp.BLL.DependencyInjection
{
    public static class BLLInjection
    {
        public static void Inject(IServiceCollection services, IConfiguration configuration)
        {
            DALInjection.Inject(services, configuration);

            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IJWTService, JWTService>();
            services.AddScoped<IMenuService, MenuService>();
            services.AddScoped<IOrderService, OrderService>();
        }
    }
}
