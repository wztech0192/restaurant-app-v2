﻿using RestaurantApp.DAL.Enum;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RestaurantApp.BLL.DTOs
{
    public class MenuDTO
    {
        public MenuDTO() { }

        internal MenuDTO(Menu entity, bool includeDetail = true)
        {
            ID = entity.ID;
            Name = entity.Name;
            Status = entity.Status;
            if (includeDetail)
            {
                Tax = entity.Tax;
                MenuEntries = entity.MenuEntries.Select(en => new MenuEntryDTO(en));
                SideItems = entity.SideItems.Select(en => new MenuOptionDTO(en));
            }
        }

        public int ID { get; set; }

        public string Name { get; set; }

        public double Tax { get; set; }

        public MenuStatus Status { get; set; }

        public IEnumerable<MenuEntryDTO> MenuEntries { get; set; } = new List<MenuEntryDTO>();

        public IEnumerable<MenuOptionDTO> SideItems = new List<MenuOptionDTO>();
    }
}
