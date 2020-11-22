using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Infrastructures;
using RestaurantApp.DAL.Enum;
using System.Collections;
using System.Collections.Generic;

namespace RestaurantApp.BLL.Services
{
    public interface IOrderRuleService
    {
        IServiceMessage<IDictionary<string, OrderRuleDTO>> Get();
        IServiceMessage<OrderRuleDTO> CreateOrUpdate(OrderRuleDTO dto);
        IServiceMessage<bool> Remove(string ruleName);

    }
}