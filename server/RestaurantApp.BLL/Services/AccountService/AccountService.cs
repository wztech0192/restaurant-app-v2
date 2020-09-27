using Microsoft.EntityFrameworkCore.Internal;
using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Infrastructures;
using RestaurantApp.DAL;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace RestaurantApp.BLL.Services
{
    public class AccountService : BaseService, IAccountService
    {

        public AccountService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }



        public IServiceMessage<AccountDTO> Create(AccountDTO dto)
        {
            var msg = base.Create<AccountDTO>();

            try
            {
                validateCreateAccount(dto);

                var entity = new Account();
                entity.Email = dto.Email;
                entity.Name = dto.Name;
                entity.Password = BCrypt.Net.BCrypt.HashPassword(entity.Password);

                base.UnitOfWork.Accounts.Add(entity);
                base.UnitOfWork.Complete();

                msg.Data = new AccountDTO(entity);
                msg.Success = true;
            }
            catch (Exception e)
            {
                base.HandleException(msg, e);
            }

            return msg;
        }


        public IServiceMessage<IEnumerable<AccountDTO>> GetAll()
        {
            //todo authenticate

            var msg = base.Create<IEnumerable<AccountDTO>>();

            try
            {
                msg.Data = base.UnitOfWork.Accounts.GetAll().Select(acc => new AccountDTO(acc));
                msg.Success = true;
            }
            catch (Exception e)
            {
                base.HandleException(msg, e);
            }
            return msg;
        }

        #region validator

        private void validateCreateAccount(AccountDTO dto)
        {
            base.HandleValidation(errors =>
            {
                validateAccountDTO(errors, dto);

                if (!errors.Any() && base.UnitOfWork.Accounts.GetByEmail(dto.Email) != null)
                {
                    errors.Add("The provided email already existed in the service");
                }
            });
        }

        private void validateAccountDTO(List<string> errors, AccountDTO dto)
        {
            if (dto == null)
            {
                errors.Add("Account dto cannot be null");
            }
            else
            {
                if (string.IsNullOrEmpty(dto.Name))
                {
                    errors.Add("A name is required");
                }
                if (string.IsNullOrEmpty(dto.Password))
                {
                    errors.Add("A password is required");
                }
                else if (dto.Password.Length < 6 || dto.Password.Length > 100)
                {
                    errors.Add("Password length must between 6 and 100.");
                }

                if (string.IsNullOrEmpty(dto.Email))
                {
                    errors.Add("A email is required");
                }
                else
                {
                    var check = new EmailAddressAttribute();
                    if (check.IsValid(dto.Email))
                    {
                        errors.Add("Incorrect email format");
                    }
                }
            }
        }


        #endregion
    }
}
