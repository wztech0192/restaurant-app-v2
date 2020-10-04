using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace RestaurantApp.BLL.Infrastructures
{
    public class ServiceMessage<T> : IServiceMessage<T>
    {
        public bool Success { get; set; }


        public HttpStatusCode? ResCode { get; set; }

        public ICollection<string> ErrorMessages { get; set; } = new List<string>();

        public T Data { get; set; }

        public void AddMessage(string msg)
        {
            ErrorMessages.Add(msg);
        }

        public void AddMessages(IEnumerable<string> errors)
        {
            foreach(var error in errors)
            {
                ErrorMessages.Add(error);
            }
        }
    }
}
