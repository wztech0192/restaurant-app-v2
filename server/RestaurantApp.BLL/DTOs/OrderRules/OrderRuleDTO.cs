using RestaurantApp.DAL.Enum;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RestaurantApp.BLL.DTOs
{
    public class OrderRuleDTO
    {

        public OrderRuleDTO() { }

        internal OrderRuleDTO(OrderRule entity)
        {
            Name = entity.Name;
            ActiveTarget = entity.ActiveTarget;
            ActiveTimes = entity.ActiveTimes.Select(at => new OrderRuleTimeRangeDTO(at));
        }

        public string Name { get; set; }

        public bool ActiveTarget { get; set; }

        public IEnumerable<OrderRuleTimeRangeDTO> ActiveTimes { get; set; } = new List<OrderRuleTimeRangeDTO>();
    }
}
