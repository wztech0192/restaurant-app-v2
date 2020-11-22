using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Infrastructures;
using RestaurantApp.BLL.Infrastructures.Exceptions;
using RestaurantApp.DAL;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace RestaurantApp.BLL.Services
{
    internal class JWTService : IJWTService
    {

        private readonly AppSettings _appSettings;
        private readonly IUnitOfWork _unitOfWork;
        private readonly HttpContext httpContext;


        public JWTService(IUnitOfWork unitOfWork, IOptions<AppSettings> appSettingOptions, IHttpContextAccessor httpContextAccessor)
        {
            _unitOfWork = unitOfWork;
            _appSettings = appSettingOptions.Value;
            httpContext = httpContextAccessor.HttpContext;
        }


        public Account GetCurrentAccount()
        {
            var token = httpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
            {
                try
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                    tokenHandler.ValidateToken(token, new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ClockSkew = TimeSpan.Zero,
                        ValidIssuer = _appSettings.Issuer,
                        ValidAudience = _appSettings.Audience
                    }, out SecurityToken validatedToken);

                    var jwtToken = (JwtSecurityToken)validatedToken;
                    var accountId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

                    return _unitOfWork.Accounts.Get(accountId);
                }
                catch(Exception e)
                {
                    throw new ServiceException(e.Message, System.Net.HttpStatusCode.Unauthorized);
                }

            }
           
            return null;
        }



        public string GenerateAccountJWTToken(Account account)
        {

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Secret));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, account.Name),
                new Claim("id", account.ID.ToString()),
                new Claim("role", account.Role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _appSettings.Issuer,
                audience: _appSettings.Audience,
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
