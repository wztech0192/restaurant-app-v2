using Microsoft.AspNetCore.SignalR;
using RestaurantApp.BLL.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Hubs
{
    public class OrderHub: Hub
    {
        /// <summary>
        /// Client Receivers
        /// </summary>
        public const string RECEIVE_ORDER = "ReceiveOrder";

        public async Task SubmitOrder(OrderDTO order)
        {
           // await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
