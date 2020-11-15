using RestaurantApp.DAL.Enum;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantApp.BLL.DTOs
{
    public class OrderedItemMenuOptionItemDTO { 

        public OrderedItemMenuOptionItemDTO() { }

        internal OrderedItemMenuOptionItemDTO(OrderedItemMenuOptionItem entity)
        {
            Quantity = entity.Quantity;
            Price = entity.MenuOptionItem.Price;
            GroupName = entity.MenuOptionItem.Group.Name;
            Name = entity.MenuOptionItem.Name;
            Key = entity.Key;
            OptionId = entity.MenuOptionItemID;
        }

        public double Price { get; set; }
        public string GroupName { get; set; }
        public string Name { get; set; }

        public string Key { get; set; }
        public int Quantity { get; set; }
        public int OptionId { get;  set; }
    }
}
