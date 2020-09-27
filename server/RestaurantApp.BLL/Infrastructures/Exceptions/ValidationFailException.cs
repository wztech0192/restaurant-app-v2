using System;
using System.Collections.Generic;
using System.Text;

namespace RestaurantApp.BLL.Infrastructures.Exceptions
{
    internal class ValidationFailException : Exception
    {
        public IEnumerable<string> Errors { get; set; }

        public ValidationFailException(IEnumerable<string> errors)
        {
            Errors = errors;
        }
    }
}
