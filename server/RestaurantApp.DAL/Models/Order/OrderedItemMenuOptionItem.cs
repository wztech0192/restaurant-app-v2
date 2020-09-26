using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RestaurantApp.DAL.Models
{
    public class OrderedItemMenuOptionItem
    {

        public int OrderedItemID { get; set; }

        public virtual OrderedItem OrderedItem { get; set; }

        public int MenuOptionItemID { get; set; }
        public MenuOptionItem MenuOptionItem { get; set; }


    }
}
