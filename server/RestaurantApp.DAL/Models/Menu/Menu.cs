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
        public string Version { get; set; }

        public int Tax { get; set; }

        public MenuStatus Status { get; set; }

        public virtual ICollection<MenuEntry> MenuEntries { get; set; } = new List<MenuEntry>();

        public virtual ICollection<MenuOptionItem> SideItems { get; set; } = new List<MenuOptionItem>();
    }
}
