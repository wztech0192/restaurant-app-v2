using RestaurantApp.DAL.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RestaurantApp.DAL.Models
{
    public class Menu
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }

        public double Tax { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public MenuStatus Status { get; set; }

        public virtual ICollection<MenuEntry> MenuEntries { get; set; } = new List<MenuEntry>();

        public virtual ICollection<MenuOptionGroup> OptionGroups { get; set; } = new List<MenuOptionGroup>();

        public static string SideOptionGroupName => "side orders";
    }
}
