using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RestaurantApp.DAL.Models
{
    public class MenuOptionGroup
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }

        public virtual ICollection<MenuOptionItem> MenuOptionItems { get; set; } = new List<MenuOptionItem>();

        [Required]
        public virtual Menu Menu { get; set; }
    }
}
