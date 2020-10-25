using RestaurantApp.DAL.Enum;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RestaurantApp.BLL.DTOs
{
    public class MenuItemDTO
    {
        public MenuItemDTO() { }

        internal MenuItemDTO(MenuItem entity)
        {
            ID = entity.ID;
            Name = entity.Name;
            Summary = entity.Summary;
            Price = entity.Price;
            OptionPriceMultiplier = entity.OptionPriceMultiplier;
            CanAddSides = entity.CanAddSides;
            if (!string.IsNullOrEmpty(entity.MenuOptionGroups))
            {
                OptionGroupNames = entity.MenuOptionGroups.Split(MenuItem.Seperator);
            }
        }

        public int ID { get; set; }

        public string Name { get; set; }

        public string Summary { get; set; }

        public double Price { get; set; }

        public double OptionPriceMultiplier { get; set; }
        public bool CanAddSides { get; set; }

        public IEnumerable<string> OptionGroupNames { get; set; } = new List<string>();
    }
}
