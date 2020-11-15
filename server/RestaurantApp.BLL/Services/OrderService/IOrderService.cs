using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Infrastructures;
using RestaurantApp.DAL.Enum;
using System.Collections;
using System.Collections.Generic;

namespace RestaurantApp.BLL.Services
{
    public interface IOrderService
    {
        IServiceMessage<IEnumerable<OrderDTO>> GetRecent(int num);
        IServiceMessage<IEnumerable<OrderDTO>> GetAll();
        IServiceMessage<OrderDTO> Create(OrderDTO dto);
        IServiceMessage<OrderDTO> Get(int id);
    }
}