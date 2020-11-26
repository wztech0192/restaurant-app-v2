using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Infrastructures;
using RestaurantApp.BLL.Services;
using RestaurantApp.DAL.Enum;
using RestaurantApp.Hubs;

namespace RestaurantApp.Controllers
{
    [ApiController]
    public class OrderController : BaseController
    {

        private readonly IOrderService _service;
        private readonly IHubContext<OrderHub> _orderHub;

        public OrderController(IOrderService service, IHubContext<OrderHub> orderHub)
        {
            _service = service;
            _orderHub = orderHub;
        }

        /// <summary>
        /// query orders
        /// </summary>
        /// <returns>A list of orders</returns>
        [HttpGet("query")]
        [Authorize(Roles = Policy.Manager)]
        public IActionResult Query([FromQuery] IEnumerable<DateTime> dateRange, [FromQuery] IEnumerable<OrderStatus> status)
        {
            return base.ProcessService(_service.Query(dateRange, status));
        }

        /// <summary>
        /// Get a order.
        /// </summary>
        /// <returns>detailed order</returns>
        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(int id)
        {
            return base.ProcessService(_service.Get(id));
        }

        /// <summary>
        /// Get status of provided order ids
        /// </summary>
        /// <returns>list of id/status pair</returns>
        [HttpGet("status")]
        public IActionResult GetStatus([FromQuery] IEnumerable<int> ids)
        {
            return base.ProcessService(_service.GetStatus(ids));
        }

        /// <summary>
        /// Get recent 5 orders.
        /// </summary>
        /// <returns>list of orders</returns>
        [HttpGet("recent/{num}")]
        [Authorize]
        public IActionResult GetRecent(int num)
        {
            return base.ProcessService(_service.GetRecent( num));
        }


        /// <summary>
        /// Create a order
        /// </summary>
        /// <returns>Order</returns>
        [HttpPost("")]
        public IActionResult Post(OrderDTO dto)
        {
            var msg = _service.Create(dto);

            if (msg.Success)
            {
                //notify all managers
                _orderHub.Clients.Group(Policy.Manager).SendAsync(OrderHub.RECEIVE_ORDER, msg.Data);
                //delete encrypted card data before reach the client
                msg.Data.EncryptedCardInfo = null;
            }
        
            return base.ProcessService(msg);
        }

        /// <summary>
        /// Put order status
        /// </summary>
        /// <returns>order id and status</returns>
        [HttpPut("{id}/status/{status}")]
        public IActionResult Put(int id, OrderStatus status)
        {
            var msg = _service.UpdateOrderStatus(id, status);

            if (msg.Success)
            {
                _orderHub.Clients.All.SendAsync(OrderHub.UPDATE_ORDER_STATUS, id, status);
            }

            return base.ProcessService(msg);
        }
    }
}
