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

        private readonly IOrderRuleService _orderRuleService;

        public OrderService(
            IUnitOfWork unitOfWork,
            IOptions<AppSettings> appSettingOptions,
            IOrderRuleService orderRuleService,
            IJWTService jwtService)
            : base(unitOfWork, appSettingOptions, jwtService)
        {
            _orderRuleService = orderRuleService;
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

        public IServiceMessage<IEnumerable<OrderDTO>> Query(IEnumerable<DateTime> dateRange, IEnumerable<OrderStatus> status)
        {
            return base.ProcessMessage<IEnumerable<OrderDTO>>(msg =>
            {

                var start = dateRange.First();
                var stop = dateRange.Last().AddHours(23).AddMinutes(59);
                msg.Data = base.UnitOfWork.Orders
                    .Find(order =>
                      start <= order.CreatedOn && order.CreatedOn <= stop &&
                        (!status.Any() || status.Contains(order.Status)))
                    .OrderByDescending(order=>order.CreatedOn)
                    .Select(menu => new OrderDTO(menu, true));

                msg.Success = true;
            });
        }

        public IServiceMessage<IDictionary<int, OrderStatus>> GetStatus(IEnumerable<int> ids)
        {
            return base.ProcessMessage<IDictionary<int, OrderStatus>>(msg =>
            {
                msg.Data = base.UnitOfWork.Orders
                    .Find(order => ids.Contains(order.ID))
                    .ToDictionary(order => order.ID, order => order.Status);
                msg.Success = true;
            });
        }


        public IServiceMessage<IEnumerable<OrderDTO>> GetRecent(int num)
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
                    msg.Data = account.Orders
                    .OrderByDescending(x => x.CreatedOn)
                    .Take(num)
                    .Select(x => new OrderDTO(x, false));
                    msg.Success = true;

                }
            });
        }

        public IServiceMessage<bool> UpdateOrderStatus(int id, OrderStatus status)
        {
            return base.ProcessMessage<bool>(msg =>
            {
                var order = base.UnitOfWork.Orders.Get(id);
                validateOrderToUpdateStatus(order);
                order.Status = status;

                base.UnitOfWork.Complete();
                msg.Success = true;
            });
        }

        public IServiceMessage<OrderDTO> Create(OrderDTO dto)
        {
            return base.ProcessMessage<OrderDTO>(msg =>
            {
                var account = base.JWTService.GetCurrentAccount();


                var orderRuleMsg = _orderRuleService.Get();
                if (orderRuleMsg.Success)
                {
                    var orderRules = orderRuleMsg.Data;
                    validateCreateOrder(dto, account, orderRules);

                    var menu = base.UnitOfWork.Menus.GetActive();

                    var allMenuItems = menu.MenuEntries.SelectMany(x => x.MenuItems).ToDictionary(x => x.ID);
                    var allOptionItems = menu.OptionGroups.SelectMany(x => x.MenuOptionItems).ToDictionary(x => x.ID);

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
                                MenuOptionItem = allOptionItems[orderedOptionDto.Value.OptionId]
                            }).ToList()
                        }).ToList()
                    };


                    if (dto.CardId > 0)
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


                    base.UnitOfWork.Orders.Add(entity);
                    base.UnitOfWork.Complete();

                    msg.Data = new OrderDTO(entity);
                    msg.Success = true;
                }
                else
                {
                    msg.AddMessages(orderRuleMsg.ErrorMessages);
                }
            });
        }

        private void validateCreateOrder(OrderDTO dto, Account account, IDictionary<string, OrderRuleDTO> orderRules)
        {
            base.HandleValidation(msg =>
            {
                if(orderRules is null)
                {
                    msg.Add("Rules cannot found");
                }
                else if (dto is null)
                {
                    msg.Add("Dto cannot found");
                }
                else
                {

                    if (!_orderRuleService.ValidateRule(orderRules, "global"))
                    {
                        msg.Add("Service is unavailable");
                    }
                    if (string.IsNullOrEmpty(dto.Name))
                    {
                        msg.Add("A order person name is required");
                    }
                    if (string.IsNullOrEmpty(dto.Phone))
                    {
                        msg.Add("A phone number is required");
                    }
                    else if (dto.Phone.Length != 10)
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
                        foreach (var item in dto.OrderedItems)
                        {
                            validateOrderItem(msg, item, orderRules);
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
                        else if (!account.Cards.Any(x => x.ID == dto.CardId))
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

        private void validateOrderItem(List<string> msg, OrderedItemDTO item, IDictionary<string, OrderRuleDTO> orderRules)
        {
            if(!_orderRuleService.ValidateRule(orderRules, item.Name) || !_orderRuleService.ValidateRule(orderRules, item.EntryName))
            {
                msg.Add($"Item {item.Name} is currently not available");
            }
            if (string.IsNullOrEmpty(item.EntryName))
            {
                msg.Add("A item entry name is required");
            }
            if (string.IsNullOrEmpty(item.Name))
            {
                msg.Add("A item name is required");
            }
        }

        private void validateOrderToUpdateStatus(Order order)
        {
            base.HandleValidation(msg =>
            {
                if (order is null)
                {
                    msg.Add("Order not found");
                }
                else if (order.Status != OrderStatus.Pending)
                {
                    msg.Add("Only pending order status can be update");
                }
            });
        }
    }
}
