using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RestaurantApp.DAL.Models
{
    public class OrderedItem
    {

        [Key]
        public int ID { get; set; }

        public double Total { get; set; }

        [Required]
        public virtual Order Order { get; set; }

        [Required]
        public virtual MenuItem MenuItem { get; set; }

        public virtual IEnumerable<OrderedItemMenuOptionItem> OrderedOptions { get; set; }


    }
}
