using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantApp.BLL.Infrastructures;

namespace RestaurantApp.Controllers
{
    [ApiController]
    public class BaseController : ControllerBase
    {
        public IActionResult ProcessService<T>(IServiceMessage<T> msg)
        {
            if (msg.Success)
            {
                return Ok(msg.Data);
            }

            return BadRequest(msg.ErrorMessages);
        }
    }
}
