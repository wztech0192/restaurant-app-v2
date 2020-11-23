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

        public const string UPDATE_ORDER_RULES = "UpdateOrderRules";

        public const string UPDATE_ORDER_STATUS = "UpdateOrderStatus";

    }
}
