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

        public int Quantity { get; set; }
        public double Price { get; set; }
        public string AdditionalRequest { get; set; }

        [Required]
        public virtual Order Order { get; set; }

        [Required]
        public virtual MenuItem MenuItem { get; set; }

        public virtual ICollection<OrderedItemMenuOptionItem> OrderedOptions { get; set; } = new List<OrderedItemMenuOptionItem>();


    }
}
