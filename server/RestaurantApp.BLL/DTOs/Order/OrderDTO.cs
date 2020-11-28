using RestaurantApp.DAL.Enum;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RestaurantApp.BLL.DTOs
{
    public class OrderDTO
    {

        public OrderDTO() { }

        internal OrderDTO(Order entity, bool includeCardInfo = false)
        {
            ID = entity.ID;
            CreatedOn = entity.CreatedOn;
            Phone = entity.Phone;
            Name = entity.Name;
            Tip = entity.Tip;
            Price = entity.Price;
            Status = entity.Status;
            AdditionalRequest = entity.AdditionalRequest;
            AccountId = entity.Account?.ID ?? 0;
            MenuId = entity.Menu.ID;
            OrderedItems = entity.OrderedItems.Select(order => new OrderedItemDTO(order));
            Tax = entity.Menu.Tax;
            if (includeCardInfo)
            {
                EncryptedCardInfo = entity.EncryptedCardInfo;
            }
        }

        public int ID { get; set; }

        public DateTime CreatedOn { get; set; }

        public string EncryptedCardInfo { get; set; }

        public string LastFourDigit { get; set; }


        public string Phone { get; set; }

        public string Name { get; set; }

        public double Tip { get; set; }

        public double Price { get; set; }

        public double Tax { get; set; }

        public OrderStatus Status { get; set; }
        public string AdditionalRequest { get; set; }

        public int AccountId { get; set; }

        public int MenuId { get; set; }

        public int CardId { get; set; }

        public bool SaveCard { get; set; }
        public IEnumerable<OrderedItemDTO> OrderedItems { get; set; } = new List<OrderedItemDTO>();
    }
}
