using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Infrastructures;
using RestaurantApp.BLL.Services;

namespace RestaurantApp.Controllers
{
    [ApiController]
    public class MenuController : BaseController
    {

        private readonly IMenuService _service;

        public MenuController(IMenuService service)
        {
            _service = service;
        }

        /// <summary>
        /// Get all menus.
        /// </summary>
        /// <returns>A list of menu name and status</returns>
        [HttpGet("all")]
        [Authorize(Roles = Policy.Manager)]
        public IActionResult GetAll()
        {
            return base.ProcessService(_service.GetAll());
        }

        /// <summary>
        /// Get a menu.
        /// </summary>
        /// <returns>Detail menu data</returns>
        [HttpGet("{id}")]
        [Authorize(Roles = Policy.Manager)]
        public IActionResult Get(int id)
        {
            return base.ProcessService(_service.Get(id));
        }

        /// <summary>
        /// Create or update a menu
        /// </summary>
        /// <returns>Menu</returns>
        [HttpDelete("{id}")]
        [Authorize(Roles = Policy.Manager)]
        public IActionResult Remove(int id)
        {
            return base.ProcessService(_service.DeleteDraftMenu(id));
        }

        /// <summary>
        /// Create or update a menu
        /// </summary>
        /// <returns>Menu</returns>
        [HttpPost("")]
        [Authorize(Roles = Policy.Manager)]
        public IActionResult Post(MenuDTO dto)
        {
            return base.ProcessService(_service.CreateOrUpdate(dto));
        }
    }
}
