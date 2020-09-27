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
        public IActionResult Post(AccountDTO dto)
        {
            return base.ProcessService(_service.Create(dto));
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return base.ProcessService(_service.GetAll());
        }
    }
}
