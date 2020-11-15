using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Text;

namespace RestaurantApp.DAL.Models


    public class Account
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string Phone { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }

        public virtual ICollection<Card> Cards { get; set; } = new List<Card>();
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

        Required]
        public string Role { get; set; }
    }
}
