using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Options;
using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Infrastructures;
using RestaurantApp.BLL.Infrastructures.Exceptions;
using RestaurantApp.DAL;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;

namespace RestaurantApp.BLL.Services
{
    internal class AccountService : BaseService, IAccountService
    {

        public AccountService(
            IUnitOfWork unitOfWork,
            IOptions<AppSettings> appSettingOptions,
            IJWTService jwtService)
            : base(unitOfWork, appSettingOptions, jwtService)
        {
        }


        public IServiceMessage<AccountDTO> Login(AccountDTO dto)
        {
            return base.ProcessMessage<AccountDTO>(msg =>
            {

                validateLoginAccount(dto);

                var entity = base.UnitOfWork.Accounts.GetByEmail(dto.Email);

                validAccountPassword(dto, entity);

                msg.Data = new AccountDTO(entity)
                {
                    Token = base.JWTService.GenerateAccountJWTToken(entity)
                };
                msg.Success = true;
            });
        }

        public IServiceMessage<AccountDTO> Update(AccountDTO dto)
        {
            return base.ProcessMessage<AccountDTO>(msg =>
            {
                var entity = base.JWTService.GetCurrentAccount();

                validateCreateOrUpdateAccount(dto, entity, true);
                validAccountPassword(dto, entity);

                setAccountMetadata(dto, entity, true);

                base.UnitOfWork.Complete();

                msg.Data = new AccountDTO(entity);
                msg.Success = true;
            });
        }

        public IServiceMessage<AccountDTO> Create(AccountDTO dto)
        {
            return base.ProcessMessage<AccountDTO>(msg =>
            {
                validateCreateOrUpdateAccount(dto);

                var entity = new Account
                {
                    Role = Policy.User,
                    CreatedOn = DateTime.Now
                };

                setAccountMetadata(dto, entity);

                base.UnitOfWork.Accounts.Add(entity);
                base.UnitOfWork.Complete();

                msg.Data = new AccountDTO(entity)
                {
                    Token = base.JWTService.GenerateAccountJWTToken(entity),
                };
                msg.Success = true;
            });
        }


        public IServiceMessage<IEnumerable<AccountDTO>> GetAll()
        {
            return base.ProcessMessage<IEnumerable<AccountDTO>>(msg =>
            {
                msg.Data = base.UnitOfWork.Accounts.GetAll().Select(acc => new AccountDTO(acc));
                msg.Success = true;
            });
        }

        private void setAccountMetadata(AccountDTO dto, Account entity, bool useNewPassword = false)
        {
            entity.Email = dto.Email;
            entity.Name = dto.Name;

            if (useNewPassword)
            {
                if(!string.IsNullOrEmpty(dto.NewPassword))
                    entity.Password = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            }
            else
            {
                entity.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            }
        }

        #region validator

        private void validatePassword(List<string> errors, string password)
        {
            if(password.Length < 6 || password.Length > 100)
            {
                errors.Add("Password length must between 6 and 100.");
            }
        }

        private void validAccountPassword(AccountDTO dto, Account entity)
        {
            if (entity == null || !BCrypt.Net.BCrypt.Verify(dto.Password, entity.Password))
            {
                throw new ServiceException("Incorrect user name or password, please retry!", HttpStatusCode.Unauthorized);
            }
        }

        private void validateCreateOrUpdateAccount(AccountDTO dto, Account entity = null, bool isUpdate = false)
        {
            base.HandleValidation(errors =>
            {
                validateAccountDTO(errors, dto);

                if (string.IsNullOrEmpty(dto.Name))
                {
                    errors.Add("A name is required");
                }

                if(isUpdate && !string.IsNullOrEmpty(dto.NewPassword))
                {
                    validatePassword(errors, dto.NewPassword);
                }

                if (!errors.Any())
                {
                    var existingEmail = base.UnitOfWork.Accounts.GetByEmail(dto.Email);

                    if (isUpdate && entity == null)
                    {
                        errors.Add("Account not found!");
                    }
                    else if (existingEmail != null && (!isUpdate || existingEmail.ID != entity.ID))
                    {
                        errors.Add("The provided email already existed in the service");
                    }
                }
            });
        }

        private void validateLoginAccount(AccountDTO dto)
        {
            base.HandleValidation(errors =>
            {
                validateAccountDTO(errors, dto);
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

                if (string.IsNullOrEmpty(dto.Password))
                {
                    errors.Add("A password is required");
                }
                else
                {
                    validatePassword(errors, dto.Password);
                }
          

                if (string.IsNullOrEmpty(dto.Email))
                {
                    errors.Add("A email is required");
                }
                else
                {
                    var check = new EmailAddressAttribute();
                    if (!check.IsValid(dto.Email))
                    {
                        errors.Add("Incorrect email format");
                    }
                }
            }
        }


        #endregion
    }
}
