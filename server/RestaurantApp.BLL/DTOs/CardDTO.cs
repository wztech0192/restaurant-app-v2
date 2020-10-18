using RestaurantApp.DAL.Models;
using System;

namespace RestaurantApp.BLL.DTOs
{
    public class CardDTO
    {
        public CardDTO()
        {
        }

        internal CardDTO(Card entity)
        {
            ID = entity.ID;
            EncryptedCardInfo = entity.EncryptedCardInfo;
            CreatedOn = entity.CreatedOn;
            HolderName = entity.HolderName;
            LastFourDigit = entity.LastFourDigit;
        }

        public int ID { get; set; }
        public string EncryptedCardInfo { get; set; }
        public DateTime CreatedOn { get; set; }
        public string HolderName { get; set; }
        public int LastFourDigit { get; set; }
    }
}