using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RestaurantApp.DAL.Models
{
    public class MenuOptionItem
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }

        public double Price { get; set; }

        [Required]
        public virtual MenuOptionGroup Group { get; set; }

        public virtual ICollection<OrderedItemMenuOptionItem> OrderedItems { get; set; } = new List<OrderedItemMenuOptionItem>();

    }
}
