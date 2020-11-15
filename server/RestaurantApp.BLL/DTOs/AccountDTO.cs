using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
            Name = entity.Name;
            Phone = entity.Phone;
            CreatedOn = entity.CreatedOn;
            Role = entity.Role;

            Cards = entity.Cards.Select(c => new CardDTO(c));
            DefaultCardId = entity.Cards.FirstOrDefault(x => x.UseAsDefault)?.ID ?? 0;
        }


        public string Token { get; set; }

        public string Name { get; set; }

        public DateTime CreatedOn { get; set; }

        public string Password { get; set; }

        public string NewPassword { get; set; }

        public string Role { get; set; }

        public string Phone { get; set; }

        public int DefaultCardId { get; set; }
        public IEnumerable<CardDTO> Cards { get; set; } = new List<CardDTO>();

    }
}
