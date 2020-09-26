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

        public double Tip { get; set; }

        public double Total { get; set; }

        public OrderStatus Status { get; set; }

        public virtual Account Account { get;set;}

        public virtual Menu Menu { get; set; }

        public virtual IEnumerable<OrderedItem> OrderedItems { get; set; }

    }
}
