using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantApp.BLL.Infrastructures
{
    public interface IServiceMessage<T> 
    {
        bool Success { get; set; }
        ICollection<string> ErrorMessages { get; set; }

        T Data { get; set; }

        void AddMessage(string msg);
        void AddMessages(IEnumerable<string> errors);
    }
}
