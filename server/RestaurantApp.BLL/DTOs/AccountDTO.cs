using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantApp.BLL.DTOs
{
    public class AccountDTO
    {

        public AccountDTO()
        {
        }

        internal AccountDTO(Account entity)
        {
            ID = entity.ID;
            Email = entity.Email;
            Name = entity.Name;
            CreatedOn = entity.CreatedOn;
        }

        public int ID { get; set; }

        public string Email { get; set; }

        public string Name { get; set; }

        public DateTime CreatedOn { get; set; }

        public string Password { get; set; }

    }
}
