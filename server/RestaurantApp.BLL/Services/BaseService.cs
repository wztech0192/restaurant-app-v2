using Microsoft.EntityFrameworkCore.Internal;
using RestaurantApp.BLL.Infrastructures;
using RestaurantApp.DAL;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using RestaurantApp.BLL.Infrastructures.Exceptions;

namespace RestaurantApp.BLL.Services
{
    public class BaseService
    {
        protected readonly IUnitOfWork UnitOfWork;


        public BaseService(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }

        protected IServiceMessage<T> Create<T>()
        {
            return new ServiceMessage<T>();
        }

        protected void HandleException<T, TException>(IServiceMessage<T> msg, TException exception) where TException: Exception
        {
            if(exception is ValidationFailException)
            {
                msg.AddMessages((exception as ValidationFailException).Errors);
            }
            else
            {
                msg.AddMessage(exception.Message);
            }
        }

        protected void HandleValidation( Action<List<string>> validate)
        {
            var errors = new List<string>();

            validate(errors);

            if (errors.Any())
            {

                throw new ValidationFailException(errors);
            }

        }
    }
}
