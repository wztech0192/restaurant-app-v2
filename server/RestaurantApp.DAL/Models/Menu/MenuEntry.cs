using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RestaurantApp.DAL.Models
{
    public class MenuEntry
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }

        public bool Active { get; set; }

        public string Summary { get; set; }

        [Required]
        public virtual Menu Menu { get; set; }

        public virtual ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
    }
}
