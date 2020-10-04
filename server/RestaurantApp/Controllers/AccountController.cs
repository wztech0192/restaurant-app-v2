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
    public class AccountController : BaseController
    {

        private readonly IAccountService _service;

        public AccountController(IAccountService service)
        {
            _service = service;
        }

        /// <summary>
        /// Login to a account
        /// </summary>
        /// <returns>AccountDTO with jwt token</returns>
        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public IActionResult Login(AccountDTO dto)
        {
            return base.ProcessService(_service.Login(dto));
        }

        /// <summary>
        /// Update account metadata
        /// </summary>
        /// <returns>AccountDTO</returns>
        [HttpPut]
        [Authorize]
        [Route("")]
        public IActionResult UpdateAccount(AccountDTO dto)
        {
            return base.ProcessService(_service.Update(dto));
        }

        /// <summary>
        /// Create new account
        /// </summary>
        /// <returns>AccountDTO with jwt token</returns>
        [HttpPost]
        [AllowAnonymous]
        [Route("")]
        public IActionResult CreateNewAccount(AccountDTO dto)
        {
            return base.ProcessService(_service.Create(dto));
        }

        /// <summary>
        /// Get all accounts.
        /// </summary>
        /// <returns>List of all accounts</returns>
        [HttpGet("all")]
        [Authorize(Roles = Policy.Manager)]
        public IActionResult GetAll()
        {
            return base.ProcessService(_service.GetAll());
        }
    }
}
