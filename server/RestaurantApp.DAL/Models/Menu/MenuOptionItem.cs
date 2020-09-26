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

        public virtual MenuOptionGroup MenuOptionGroup { get; set; }

        public virtual Menu Menu { get; set; }

        public virtual IEnumerable<OrderedItemMenuOptionItem> OrderedItemMenuOptionItems { get; set; }

        [NotMapped]
        public bool IsSideOption => Menu != null;

    }
}
