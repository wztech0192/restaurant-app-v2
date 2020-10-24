using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Infrastructures;
using System.Collections;
using System.Collections.Generic;

namespace RestaurantApp.BLL.Services
{
    public interface IMenuService
    {
        IServiceMessage<IEnumerable<MenuDTO>> GetAll();
        IServiceMessage<MenuDTO> CreateOrUpdate(MenuDTO dto);
        IServiceMessage<MenuDTO> Get(int id);
        IServiceMessage<int> DeleteDraftMenu(int id);
    }
}