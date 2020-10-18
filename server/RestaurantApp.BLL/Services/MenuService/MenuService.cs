using Microsoft.Extensions.Options;
using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Infrastructures;
using RestaurantApp.DAL;
using RestaurantApp.DAL.Enum;
using RestaurantApp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RestaurantApp.BLL.Services
{
    internal class MenuService : BaseService, IMenuService
    {

        public MenuService(
            IUnitOfWork unitOfWork,
            IOptions<AppSettings> appSettingOptions,
            IJWTService jwtService)
            : base(unitOfWork, appSettingOptions, jwtService)
        {
        }



        public IServiceMessage<IEnumerable<MenuDTO>> GetAll()
        {
            return base.ProcessMessage<IEnumerable<MenuDTO>>(msg =>
            {
                msg.Data = base.UnitOfWork.Menus
                    .GetAll()
                    .Select(menu => new MenuDTO(menu, false));
                msg.Success = true;
            });
        }

        public IServiceMessage<MenuDTO> CreateOrUpdate(MenuDTO dto)
        {
            return base.ProcessMessage<MenuDTO>(msg =>
            {
                Menu entity = null;
                if(dto.ID > 0)
                {
                    entity = base.UnitOfWork.Menus.Get(dto.ID);
                }
                else
                {
                    entity = new Menu()
                    {
                        CreatedOn = DateTime.Now,
                        Status = MenuStatus.Draft
                    };
                    base.UnitOfWork.Menus.Add(entity);
                }

                validCreateUpdateMenu(dto, entity);

                handleUpdateMenuMetadata(dto, entity);
               
                base.UnitOfWork.Complete();

                msg.Data = new MenuDTO(entity);
                msg.Success = true;
            });
        }


        #region helper

        private void handleUpdateMenuMetadata(MenuDTO dto, Menu entity)
        {
            entity.UpdatedOn = DateTime.Now;
            entity.Name = dto.Name;
            entity.Tax = dto.Tax;

        }

        #endregion


        #region validator

        private void validCreateUpdateMenu(MenuDTO dto, Menu entity)
        {
            base.HandleValidation(msg =>
            {
                if(entity is null)
                {
                    msg.Add("Menu cannot found");
                }
                else if(entity.Status != MenuStatus.Draft)
                {
                    msg.Add("Only draft menu can be edited");
                }


                if (dto is null)
                {
                    msg.Add("Dto cannot found");
                }
                else
                {
                    if (string.IsNullOrEmpty(dto.Name))
                    {
                        msg.Add("A menu name is required");
                    }

                }
            });
            
        }

        #endregion
    }
}
