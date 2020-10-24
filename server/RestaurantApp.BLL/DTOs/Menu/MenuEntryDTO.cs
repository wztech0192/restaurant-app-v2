using RestaurantApp.DAL.Enum;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantApp.BLL.DTOs
{
    public class MenuEntryDTO
    {
        public MenuEntryDTO() { }

        internal MenuEntryDTO(MenuEntry entity)
        {
            ID = entity.ID;
            Name = entity.Name;
            Summary = entity.Summary;
          
        }

        public int ID { get; set; }

        public string Name { get; set; }

        public bool Active { get; set; }

        public string Summary { get; set; }

        public IEnumerable<MenuItemDTO> MenuItems { get; set; } = new List<MenuItemDTO>();
    }
}
