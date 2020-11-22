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
    public class OrderRulesController : BaseController
    {

        private readonly IOrderRuleService _service;
        private readonly IHubContext<OrderHub> _orderHub;

        public OrderRulesController(IOrderRuleService service, IHubContext<OrderHub> orderHub)
        {
            _service = service;
            _orderHub = orderHub;
        }

        /// <summary>
        /// Get all order rules.
        /// </summary>
        /// <returns>Dictionary of order rules</returns>
        [HttpGet]
        public IActionResult Get()
        {
            return base.ProcessService(_service.Get());
        }

        /// <summary>
        /// Create or update a order rule
        /// </summary>
        /// <returns>order rule</returns>
        [HttpPost]
        [Authorize(Roles = Policy.Manager)]
        public IActionResult Post(OrderRuleDTO dto)
        {

            var msg = _service.CreateOrUpdate(dto);
            notifyUser(msg);
            return base.ProcessService(msg);
        }

        /// <summary>
        /// Delete a order rule
        /// </summary>
        /// <returns>bool</returns>
        [HttpDelete("{ruleName}")]
        [Authorize(Roles = Policy.Manager)]
        public IActionResult Delete(string ruleName)
        {
            var msg = _service.Remove(ruleName);
            notifyUser(msg);
            return base.ProcessService(msg);
        }

        private void notifyUser<T>(IServiceMessage<T> msg)
        {
            var allRules = _service.Get();
            if (allRules.Success)
                _orderHub.Clients.All.SendAsync(OrderHub.UPDATE_ORDER_RULES, allRules.Data);
        }
    }
}
