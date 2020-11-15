using Microsoft.Extensions.Options;
using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Helpers;
using RestaurantApp.BLL.Infrastructures;
using RestaurantApp.BLL.Infrastructures.Exceptions;
using RestaurantApp.DAL;
using RestaurantApp.DAL.Enum;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RestaurantApp.BLL.Services
{
    internal class OrderService : BaseService, IOrderService
    {

        public OrderService(
            IUnitOfWork unitOfWork,
            IOptions<AppSettings> appSettingOptions,
            IJWTService jwtService)
            : base(unitOfWork, appSettingOptions, jwtService)
        {
        }

        public IServiceMessage<OrderDTO> Get(int orderId)
        {
            return base.ProcessMessage<OrderDTO>(msg =>
            {
                var entity = base.UnitOfWork.Orders.Get(orderId);
                msg.Data = new OrderDTO(entity);
                msg.Success = true;
            });
        }

        public IServiceMessage<IEnumerable<OrderDTO>> GetAll()
        {
            return base.ProcessMessage<IEnumerable<OrderDTO>>(msg =>
            {
                msg.Data = base.UnitOfWork.Orders
                    .GetAll()
                    .Select(menu => new OrderDTO(menu, true));
                msg.Success = true;
            });
        }

        public IServiceMessage<IEnumerable<OrderDTO>> GetLastFiveOfAccount()
        {
            return base.ProcessMessage<IEnumerable<OrderDTO>>(msg =>
            {
                var account = base.JWTService.GetCurrentAccount();

                if (account == null)
                {
                    msg.AddMessage("You don't have a account yet!");
                }
                else
                {
                    msg.Data = account.Orders.TakeLast(5).Select(x => new OrderDTO(x, false));
                    msg.Success = true;

                }
            });
        }


        public IServiceMessage<OrderDTO> Create(OrderDTO dto)
        {
            return base.ProcessMessage<OrderDTO>(msg =>
            {
                var account = base.JWTService.GetCurrentAccount();

                validateCreateOrder(dto, account);

                var menu = base.UnitOfWork.Menus.GetActive();

                var allMenuItems = menu.MenuEntries.SelectMany(x => x.MenuItems).ToDictionary(x => x.ID);

                var entity = new Order()
                {
                    AdditionalRequest = dto.AdditionalRequest,
                    CreatedOn = DateTime.Now,
                    Account = account,
                    Menu = menu,
                    Name = dto.Name,
                    Phone = dto.Phone,
                    Price = dto.Price,
                    Status = OrderStatus.Pending,
                    Tip = dto.Tip,
                    OrderedItems = dto.OrderedItems.Select(orderedItemDto => new OrderedItem()
                    {
                        AdditionalRequest = orderedItemDto.AdditionalRequest,
                        Price = orderedItemDto.Price,
                        Quantity = orderedItemDto.Quantity,
                        MenuItem = allMenuItems[orderedItemDto.ItemId],
                        OrderedOptions = orderedItemDto.OrderedOptions.Select(orderedOptionDto => new OrderedItemMenuOptionItem()
                        {
                            Key = orderedOptionDto.Value.Key,
                            Quantity = orderedOptionDto.Value.Quantity,
                            MenuOptionItemID = orderedOptionDto.Value.OptionId
                        })
                    })
                };


                if(dto.CardId > 0)
                {
                    var card = account.Cards.FirstOrDefault(c => c.ID == dto.CardId);
                    entity.EncryptedCardInfo = card.EncryptedCardInfo;
                }
                else
                {
                    entity.EncryptedCardInfo = dto.EncryptedCardInfo;

                    if (dto.SaveCard && account != null)
                    {
                        account.Cards.Add(new Card()
                        {
                            CreatedOn = DateTime.Now,
                            EncryptedCardInfo = dto.EncryptedCardInfo,
                            LastFourDigit = dto.LastFourDigit,
                        });
                    }
                }


                base.UnitOfWork.Complete();

                msg.Data = new OrderDTO(entity);
                msg.Success = true;
            });
        }

        private void validateCreateOrder(OrderDTO dto, Account account)
        {
            base.HandleValidation(msg =>
            {
                if (dto is null)
                {
                    msg.Add("Dto cannot found");
                }
                else
                {
                    if (string.IsNullOrEmpty(dto.Name))
                    {
                        msg.Add("A order person name is required");
                    }
                    if (string.IsNullOrEmpty(dto.Phone))
                    {
                        msg.Add("A phone number is required");
                    }
                    else if(dto.Phone.Length != 10)
                    {
                        msg.Add("Invalid phone number");
                    }
                    if (dto.Price <= 0)
                    {
                        msg.Add("Order price cannot be 0");
                    }

                    if (!dto.OrderedItems.Any())
                    {
                        msg.Add("One or more order items is required");
                    }
                    else
                    {
                       foreach(var item in dto.OrderedItems)
                        {
                            validateOrderItem(msg, item);
                        }
                    }
                
                    if (dto.CardId <= 0)
                    {
                        if (string.IsNullOrEmpty(dto.EncryptedCardInfo))
                        {
                            msg.Add("Card information is missing");
                        }
                        if (dto.SaveCard)
                        {
                            if (string.IsNullOrEmpty(dto.LastFourDigit))
                            {
                                msg.Add("Card last four digit is required");
                            }
                        }
                    }
                    else
                    {
                        if (account == null)
                        {
                            msg.Add("Account not found");
                        }
                        else if(!account.Cards.Any(x=>x.ID == dto.CardId))
                        {
                            msg.Add("Card not found");
                        }
                    }

                    if (string.IsNullOrEmpty(dto.Name))
                    {
                        msg.Add("A order person name is required");
                    }

                    if (string.IsNullOrEmpty(dto.Name))
                    {
                        msg.Add("A order person name is required");
                    }

                    if (string.IsNullOrEmpty(dto.Name))
                    {
                        msg.Add("A order person name is required");
                    }

                    if (string.IsNullOrEmpty(dto.Name))
                    {
                        msg.Add("A order person name is required");
                    }


                }
            });
        }

        private void validateOrderItem(List<string> msg, OrderedItemDTO item)
        {
            if (string.IsNullOrEmpty(item.EntryName))
            {
                msg.Add("A item entry name is required");
            }
            if (string.IsNullOrEmpty(item.Name))
            {
                msg.Add("A item name is required");
            }
        }
    }
}
