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
        /// Get all orders.
        /// </summary>
        /// <returns>A list of orders</returns>
        [HttpGet("all")]
        [Authorize(Roles = Policy.Manager)]
        public IActionResult GetAll()
        {
            return base.ProcessService(_service.GetAll());
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
        /// <returns>Menu</returns>
        [HttpPost("")]
        public IActionResult Post(OrderDTO dto)
        {
            var msg = _service.Create(dto);

            if (msg.Success)
            {
                _orderHub.Clients.All.SendAsync(OrderHub.RECEIVE_ORDER, msg.Data);
            }

            return base.ProcessService(msg);
        }
    }
}
