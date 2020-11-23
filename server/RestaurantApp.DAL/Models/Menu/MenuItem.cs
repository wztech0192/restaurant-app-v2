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

        [Required]
        public virtual MenuEntry MenuEntry { get; set; }

        public virtual IEnumerable<OrderedItem> OrderedItems { get; set; } = new List<OrderedItem>();

        // groupName1;groupName2,  concated string
        public string MenuOptionGroups { get; set; }

        public static string Seperator => ";";

    }
}
