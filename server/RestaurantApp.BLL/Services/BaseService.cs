using Microsoft.EntityFrameworkCore.Internal;
using RestaurantApp.BLL.Infrastructures;
using RestaurantApp.DAL;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using RestaurantApp.BLL.Infrastructures.Exceptions;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using RestaurantApp.DAL.Models;

namespace RestaurantApp.BLL.Services
{
    public class BaseService
    {
        protected readonly IUnitOfWork UnitOfWork;
        protected readonly IJWTService JWTService;
        protected readonly AppSettings AppSettings;


        public BaseService(IUnitOfWork unitOfWork, IOptions<AppSettings> appSettingOptions, IJWTService jwtService)
        {
            UnitOfWork = unitOfWork;
            AppSettings = appSettingOptions.Value;
            JWTService = jwtService;
        }

        public string GenerateJWTToken(Account account)
        {

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AppSettings.Secret));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, account.Name),

                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            var token = new JwtSecurityToken(
                issuer: AppSettings.Issuer,
                audience: AppSettings.Audience,
                claims: claims,
                expires: DateTime.Now.AddMonths(1),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        protected IServiceMessage<T> Create<T>()
        {
            return new ServiceMessage<T>();
        }

        protected IServiceMessage<T> ProcessMessage<T>(Action<IServiceMessage<T>> action)
        {
            var msg = this.Create<T>();
            try
            {
                action(msg);
            }
            catch(Exception e)
            {
                this.HandleException(msg, e);
            }
            return msg;
        }

        protected void HandleException<T, TException>(IServiceMessage<T> msg, TException exception) where TException : Exception
        {
            switch (exception)
            {
                case ServiceException serviceException:
                    msg.AddMessages(serviceException.Errors);
                    msg.ResCode = serviceException.ResCode;
                    break;
                default:
                    msg.AddMessage(exception.Message);
                    break;
            }
        }

        protected void HandleValidation(Action<List<string>> validate)
        {
            var errors = new List<string>();

            validate(errors);

            if (errors.Any())
            {

                throw new ServiceException(errors);
            }

        }
    }
}
