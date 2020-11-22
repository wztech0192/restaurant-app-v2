using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RestaurantApp.DAL.Models
{
    public class OrderRuleTimeRange
    {

        [Key]
        public int ID { get; set; }

        public string DaysOfWeek { get; set; }
        public string Start { get; set; }
        public string Stop { get; set; }

        [Required]
        public virtual OrderRule OrderRule { get; set; }

    }
}
