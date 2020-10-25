using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Infrastructures;
using RestaurantApp.DAL.Enum;
using System.Collections;
using System.Collections.Generic;

namespace RestaurantApp.BLL.Services
{
    public interface IMenuService
    {
        IServiceMessage<IEnumerable<MenuDTO>> GetAll();
        IServiceMessage<MenuDTO> CreateOrUpdate(MenuDTO dto, bool updateStatus);
        IServiceMessage<MenuDTO> Get(int id);
        IServiceMessage<int> DeleteDraftMenu(int id);
    }
}