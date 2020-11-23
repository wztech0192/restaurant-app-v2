using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Infrastructures;
using RestaurantApp.DAL.Enum;
using System;
using System.Collections;
using System.Collections.Generic;

namespace RestaurantApp.BLL.Services
{
    public interface IOrderService
    {
        IServiceMessage<IEnumerable<OrderDTO>> GetRecent(int num);
        IServiceMessage<OrderDTO> Create(OrderDTO dto);
        IServiceMessage<OrderDTO> Get(int id);
        IServiceMessage<IDictionary<int, OrderStatus>> GetStatus(IEnumerable<int> ids);
        IServiceMessage<IEnumerable<OrderDTO>> Query(IEnumerable<DateTime> dateRange, IEnumerable<OrderStatus> status);
        IServiceMessage<bool> UpdateOrderStatus(int id, OrderStatus status);
    }
}