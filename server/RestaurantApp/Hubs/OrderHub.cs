using Microsoft.AspNetCore.SignalR;
using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Infrastructures;
using RestaurantApp.BLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Hubs
{
    public class OrderHub: Hub
    {

        private readonly IJWTService _jwtService;
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

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, getUserGroupName());
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, getUserGroupName());
            await base.OnDisconnectedAsync(exception);
        }

        private string getUserGroupName()
        {
            var currentUser = _jwtService.GetCurrentAccount();
            if(currentUser != null && currentUser.Role == Policy.Manager)
            {
                return Policy.Manager;
            }
            return Policy.Customer;
        }
    }
}
