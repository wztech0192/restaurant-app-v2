using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RestaurantApp.BLL.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantApp.BLL
{
    public static class DependencyInjection
    {
        public static void InjectBLL(IServiceCollection services, IConfiguration configuration)
        {
            DAL.DependencyInjection.InjectDAL(services, configuration);

            services.AddScoped<IAccountService, AccountService>();
        }
    }
}
