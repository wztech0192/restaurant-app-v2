using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RestaurantApp.DAL.Models
{
    public class Card
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string EncryptedCardInfo { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }

        public string HolderName { get; set; }

        public int LastFourDigit { get; set; }

        public virtual Account Account { get; set; }
    }
}
