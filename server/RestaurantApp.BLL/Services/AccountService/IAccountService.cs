using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Infrastructures;
using System.Collections;
using System.Collections.Generic;

namespace RestaurantApp.BLL.Services
{
    public interface IAccountService
    {
        IServiceMessage<AccountDTO> Create(AccountDTO dto);
        IServiceMessage<IEnumerable<AccountDTO>> GetAll();
    }
}