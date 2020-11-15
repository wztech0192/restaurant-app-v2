using RestaurantApp.DAL.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RestaurantApp.DAL.Models
{
    public class Order
    {

        [Key]
        public int ID { get; set; }

        public DateTime CreatedOn { get; set; }

        public string EncryptedCardInfo { get; set; }

        [StringLength(10)]
        public string Phone { get; set; }

        [StringLength(40)]
        public string Name { get; set; }

        public double Tip { get; set; }

        public double Price { get; set; }

        public OrderStatus Status { get; set; }
        public string AdditionalRequest { get; set; }

        [Required]
        public virtual Account Account { get;set;}

        [Required]
        public virtual Menu Menu { get; set; }

        public virtual ICollection<OrderedItem> OrderedItems { get; set; }

    }
}
