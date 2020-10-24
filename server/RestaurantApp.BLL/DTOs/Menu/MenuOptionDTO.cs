using RestaurantApp.DAL.Enum;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantApp.BLL.DTOs
{
    public class MenuOptionDTO
    {
        public MenuOptionDTO() { }

        internal MenuOptionDTO(MenuOptionItem entity)
        {
            ID = entity.ID;
            Name = entity.Name;
            Price = entity.Price;
        }

        public int ID { get; set; }

        public string Name { get; set; }

        public double Price { get; set; }

    }
}
