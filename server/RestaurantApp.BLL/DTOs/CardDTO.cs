using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantApp.BLL.DTOs
{
    public class CardDTO
    {

        public CardDTO() { }

        internal CardDTO(Card entity)
        {
            UseAsDefault = entity.UseAsDefault;
            ID = entity.ID;
            LastFourDigit = entity.LastFourDigit;
        }

        public bool UseAsDefault { get; set; }
        public int ID { get; set; }
        public string EncryptedCardInfo { get; set; }
        public DateTime CreatedOn { get; set; }
        public int LastFourDigit { get; set; }
    }
}
