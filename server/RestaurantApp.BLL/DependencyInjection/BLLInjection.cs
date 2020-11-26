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
        public static void Inject(IServiceCollection services, IConfiguration configuration, bool isDevelopment)
        {
            DALInjection.Inject(services, configuration, isDevelopment);

            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IJWTService, JWTService>();
            services.AddScoped<IMenuService, MenuService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IOrderRuleService, OrderRuleService>();
        }
    }
}
