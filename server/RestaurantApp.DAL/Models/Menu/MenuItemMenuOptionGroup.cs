using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RestaurantApp.DAL.Models
{
    public class MenuItemMenuOptionGroup
    {
        public int MenuItemID { get; set; }

        public virtual MenuItem MenuItem { get; set; }

        public int MenuOptionGroupID { get; set; }
        public MenuOptionGroup MenuOptionGroup { get; set; }



    }
}
