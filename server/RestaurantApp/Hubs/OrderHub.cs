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
        public async Task SubmitOrder(OrderDTO)
        {
           // await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
