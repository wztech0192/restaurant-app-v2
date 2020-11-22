using RestaurantApp.DAL.Enum;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RestaurantApp.BLL.DTOs
{
    public class OrderRuleTimeRangeDTO
    {
        public const string Separator = ",";

        public OrderRuleTimeRangeDTO() { }

        internal OrderRuleTimeRangeDTO(OrderRuleTimeRange entity)
        {
   
            if(!string.IsNullOrEmpty(entity.DaysOfWeek))
                DaysOfWeek = entity.DaysOfWeek
                    .Split(OrderRuleTimeRangeDTO.Separator)
                    .Select(x => int.Parse(x));
            Start = entity.Start;
            Stop = entity.Stop;
            ID = entity.ID;
        }

        public int ID { get; set; }
        public IEnumerable<int> DaysOfWeek { get; set; } = new List<int>();
        public string Start { get; set; }
        public string Stop { get; set; }

        public bool IsValid => !string.IsNullOrEmpty(Start) && !string.IsNullOrEmpty(Stop) && DaysOfWeek.Any();

    }
}
