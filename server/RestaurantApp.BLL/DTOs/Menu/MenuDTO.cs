using RestaurantApp.DAL.Enum;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
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
            }
        }

        public int ID { get; set; }

        public string Name { get; set; }

        public double Tax { get; set; }

        public MenuStatus Status { get; set; }

        public virtual ICollection<MenuEntry> MenuEntries { get; set; } = new List<MenuEntry>();

        public virtual ICollection<MenuOptionItem> SideItems { get; set; } = new List<MenuOptionItem>();
    }
}
