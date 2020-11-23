using Microsoft.AspNetCore.SignalR;
using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Infrastructures;
using RestaurantApp.BLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Concurrent;


namespace RestaurantApp.Hubs
{
    public class OrderHub: Hub
    {
        private readonly IJWTService _jwtService;
        private ConcurrentDictionary<string, string> UserGroups = new ConcurrentDictionary<string, string>();

        /// <summary>
        /// Client Receivers
        /// </summary>
        public const string RECEIVE_ORDER = "ReceiveOrder";
        public const string UPDATE_ORDER_RULES = "UpdateOrderRules";
        public const string UPDATE_ORDER_STATUS = "UpdateOrderStatus";

        public OrderHub (IJWTService jwtService)
        {
            _jwtService = jwtService;
        }

        public async Task JoinGroup(string token)
        {
            if (UserGroups.TryGetValue(Context.ConnectionId, out string previousGroup))
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, previousGroup);
            }

            var groupName = getUserGroupName(token);
            UserGroups.AddOrUpdate(Context.ConnectionId, groupName, (key, oldValue) => groupName);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if(UserGroups.TryRemove(Context.ConnectionId, out string group))
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, group);
            }
            await base.OnDisconnectedAsync(exception);
        }

        private string getUserGroupName(string token)
        {
            var currentUser = _jwtService.GetCurrentAccount(token);
            if(currentUser != null && currentUser.Role == Policy.Manager)
            {
                return Policy.Manager;
            }
            return Policy.Customer;
        }
    }
}
