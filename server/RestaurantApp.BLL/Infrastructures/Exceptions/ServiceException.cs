using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace RestaurantApp.BLL.Infrastructures.Exceptions
{
    internal class ServiceException : Exception
    {
        public IEnumerable<string> Errors { get; set; }

        public HttpStatusCode? ResCode { get; set; }

        public ServiceException(IEnumerable<string> errors)
        {
            Errors = errors;
        }
        public ServiceException(string error, HttpStatusCode resCode = HttpStatusCode.BadRequest)
        {
            Errors = new List<string>() { error };
            ResCode = resCode;
        }
    }
}
