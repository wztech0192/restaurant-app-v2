using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RestaurantApp.DAL.Models
{
    public class MenuItem
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }

        public bool Active { get; set; }

        public string Summary { get; set; }

        public double Price { get; set; }

        public double OptionPriceMultiplier { get; set; }
        public bool CanAddSides { get; set; }

        public virtual MenuEntry MenuEntry { get; set; }

        public virtual ICollection<MenuItemMenuOptionGroup> MenuItemMenuOptionGroups { get; set; }



    }
}
