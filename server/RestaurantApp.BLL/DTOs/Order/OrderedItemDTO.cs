using RestaurantApp.DAL.Enum;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RestaurantApp.BLL.DTOs
{
    public class OrderedItemDTO : MenuItemDTO
    {

        public OrderedItemDTO() { }
        internal OrderedItemDTO(OrderedItem entity): base(entity.MenuItem)
        {
            ID = entity.ID;
            Quantity = entity.Quantity;
            Price = entity.Price;
            AdditionalRequest = entity.AdditionalRequest;
            EntryName = entity.MenuItem.MenuEntry.Name;
            ItemId = entity.MenuItem.ID;
            OrderedOptions = entity
                .OrderedOptions
                .Select(o => new OrderedItemMenuOptionItemDTO(o, entity.MenuItem.OptionPriceMultiplier))
                .ToDictionary(x=>x.Key);

        }

        public int ItemId { get; set; }
        public string EntryName { get; set; }
        public int Quantity { get; set; }
        public string AdditionalRequest { get; set; }

        public IDictionary<string, OrderedItemMenuOptionItemDTO> OrderedOptions { get; set; } = new Dictionary<string, OrderedItemMenuOptionItemDTO>();
    }
}
