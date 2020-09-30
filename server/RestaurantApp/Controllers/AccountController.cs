using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Services;

namespace RestaurantApp.Controllers
{
    [ApiController]
    public class AccountController : BaseController
    {

        private readonly IAccountService _service;

        public AccountController(IAccountService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("")]
        public IActionResult CreateNewAccount(AccountDTO dto)
        {
            return base.ProcessService(_service.Create(dto));
        }

        /// <summary>
        /// Get all accounts.
        /// </summary>
        /// <returns>List of all accounts</returns>
        /// <response code="200">List of all accounts</response>
        /// <response code="400">something is wrong</response>    
        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return base.ProcessService(_service.GetAll());
        }
    }
}
