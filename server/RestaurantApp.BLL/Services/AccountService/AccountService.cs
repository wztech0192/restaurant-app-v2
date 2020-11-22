using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Options;
using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Helpers;
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

        public IServiceMessage<AccountDTO> GetCurrent()
        {
            return base.ProcessMessage<AccountDTO>(msg =>
            {
                var entity = base.JWTService.GetCurrentAccount();

                if(entity == null)
                {
                    throw new ServiceException("Unauthorized, please try to login in again", HttpStatusCode.Unauthorized);
                }
                msg.Data = new AccountDTO(entity)
                {
                    Token = base.JWTService.GenerateAccountJWTToken(entity) //refresh token
                };
                msg.Success = true;
            });
        }

        public IServiceMessage<AccountDTO> Login(AccountDTO dto)
        {
            return base.ProcessMessage<AccountDTO>(msg =>
            {

                validateLoginAccount(dto);

                var entity = base.UnitOfWork.Accounts.GetByPhone(dto.Phone);

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
                if(!string.IsNullOrEmpty(dto.NewPassword))
                    validAccountPassword(dto, entity);
                setAccountMetadata(dto, entity, true);
                createOrUpdateCards(dto.Cards, entity.Cards);
                computeDefaultCard(entity.Cards);
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
                    Role = Policy.Customer,
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
            entity.Name = dto.Name;
            entity.Phone = dto.Phone;

            if (useNewPassword)
            {
                if (!string.IsNullOrEmpty(dto.NewPassword))
                    entity.Password = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            }
            else
            {
                entity.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            }
        }

        private void computeDefaultCard(ICollection<Card> entities)
        {
            //set card default
            if (entities.Any())
            {
                var hasDefaultCard = false;
                foreach (var card in entities)
                {
                    if (!hasDefaultCard)
                    {
                        if (card.UseAsDefault)
                        {
                            hasDefaultCard = true;
                        }
                    }
                    else
                    {
                        card.UseAsDefault = false;
                    }
                }
                if (!hasDefaultCard)
                {
                    entities.First().UseAsDefault = true;
                }
            }
        }

        private void createOrUpdateCards(IEnumerable<CardDTO> dtos, ICollection<Card> entities)
        {
            entities.CreateUpdateDelete(
                dtos: dtos,
                dtoKey: dto => dto.ID,
                entityKey: entity => entity.ID,
                create: (dto, _) =>
                {
                    entities.Add(new Card()
                    {
                        CreatedOn = DateTime.Now,
                        EncryptedCardInfo = dto.EncryptedCardInfo,
                        LastFourDigit = dto.LastFourDigit,
                        UseAsDefault = dto.UseAsDefault
                    });
                },
                update: (entity, dto) =>
                {
                    entity.UseAsDefault = dto.UseAsDefault;
                },
                delete: entity =>
                {
                    entities.Remove(entity);
                });
        }


        #region validator

        private void validatePassword(List<string> errors, string password)
        {
            if (password.Length < 6 || password.Length > 100)
            {
                errors.Add("Password length must between 6 and 100");
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
                validateAccountDTO(errors, dto, !isUpdate || !string.IsNullOrEmpty(dto.NewPassword));

                if (string.IsNullOrEmpty(dto.Name))
                {
                    errors.Add("A name is required");
                }


                if (string.IsNullOrEmpty(dto.Phone))
                {
                    errors.Add("A phone number is required");
                }

                if (isUpdate && !string.IsNullOrEmpty(dto.NewPassword))
                {
                    validatePassword(errors, dto.NewPassword);
                }

                if (!errors.Any())
                {
                    var existingPhone = base.UnitOfWork.Accounts.GetByPhone(dto.Phone);

                    if (isUpdate && entity == null)
                    {
                        errors.Add("Account not found!");
                    }
                    else if (existingPhone != null && (!isUpdate || existingPhone.ID != entity.ID))
                    {
                        errors.Add("The phone number is already registerd");
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

        private void validateCardDTO(List<string> errors, CardDTO dto)
        {
            if (dto == null)
            {
                errors.Add("Card dto cannot be null");
            }
            else if (dto.ID <= 0)
            {
                if (string.IsNullOrEmpty(dto.EncryptedCardInfo))
                {
                    errors.Add("Card information is required for new card");
                }
            }
        }

        private void validateAccountDTO(List<string> errors, AccountDTO dto, bool shouldValidatePassword = true)
        {
            if (dto == null)
            {
                errors.Add("Account dto cannot be null");
            }
            else
            {

                foreach (var card in dto.Cards)
                {
                    validateCardDTO(errors, card);
                }

                if (shouldValidatePassword)
                {
                    if (string.IsNullOrEmpty(dto.Password))
                    {
                        errors.Add("A password is required");
                    }
                    else
                    {
                        validatePassword(errors, dto.Password);
                    }
                }

            }
        }


        #endregion
    }
}
