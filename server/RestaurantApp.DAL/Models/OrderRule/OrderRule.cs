using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RestaurantApp.DAL.Models
{
    public class OrderRule
    {

        [Key]
        public int ID { get; set; }

        public string Name { get; set; }

        public bool ActiveTarget { get; set; }

        public virtual ICollection<OrderRuleTimeRange> ActiveTimes { get; set; }




    }
}
