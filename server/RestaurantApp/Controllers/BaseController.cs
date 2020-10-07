using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantApp.BLL.Infrastructures;

namespace RestaurantApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BaseController : ControllerBase
    {
        public IActionResult ProcessService<T>(IServiceMessage<T> msg)
        {
            if (msg.Success)
            {
                return Ok(msg.Data);
            }


            if (msg.ResCode.HasValue)
            {
                return StatusCode((int)msg.ResCode, msg.ErrorMessages);
            }

            return BadRequest(msg.ErrorMessages);
        }
    }
}
