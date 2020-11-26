using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace RestaurantApp.DAL.DependencyInjection
{
    public static class DALInjection
    {
        public static void Inject(IServiceCollection services, IConfiguration configuration, bool isDevelopment)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            if (isDevelopment)
            {
                services.AddDbContext<RestaurantAppContext>(options =>
                  options
                  .UseLazyLoadingProxies()
                  .UseSqlServer(configuration.GetConnectionString("RestaurantAppContext")));
            }
            else
            {
                services.AddDbContext<RestaurantAppContext>(options =>
               options
               .UseLazyLoadingProxies()
               .UseMySql(configuration.GetConnectionString("RestaurantAppContext")));
            }
          
        }
    }
}
