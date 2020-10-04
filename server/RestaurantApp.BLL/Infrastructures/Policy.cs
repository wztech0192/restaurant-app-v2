using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.BLL.Infrastructures
{
    public static class Policy
    {
        public const string Manager = "Manager";
        public const string Customer = "Customer";


        public static void AddPolicies(AuthorizationOptions config)
        {
            AddPolicy(config, Manager);
            AddPolicy(config, Customer);
        }

        public static void AddPolicy(AuthorizationOptions config, string Role)
        {
            config.AddPolicy(Manager, new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Role).Build());
     
        }
    }
}
