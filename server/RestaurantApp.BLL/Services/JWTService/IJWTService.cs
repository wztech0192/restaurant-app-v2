using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Infrastructures;
using RestaurantApp.DAL.Models;
using System.Collections;
using System.Collections.Generic;

namespace RestaurantApp.BLL.Services
{
    public interface IJWTService
    {
        string GenerateAccountJWTToken(Account account);

        Account GetCurrentAccount();
    }
}