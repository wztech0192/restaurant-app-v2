using Microsoft.Extensions.Options;
using RestaurantApp.BLL.DTOs;
using RestaurantApp.BLL.Helpers;
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

        public IServiceMessage<MenuDTO> Get(int menuId)
        {
            return base.ProcessMessage<MenuDTO>(msg =>
            {
                var entity = base.UnitOfWork.Menus.Get(menuId);

                msg.Data = new MenuDTO(entity);
                msg.Success = true;
            });
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

        public IServiceMessage<int> DeleteDraftMenu(int id)
        {
            return base.ProcessMessage<int>(msg =>
            {
                var menu = base.UnitOfWork.Menus.Get(id);
                validateRemoveMenu(menu);

                foreach (var menuEntry in menu.MenuEntries)
                {
                    menuEntry.MenuItems.Clear();
                }
                menu.MenuEntries.Clear();

                foreach (var optionGroup in menu.OptionGroups)
                {
                    optionGroup.MenuOptionItems.Clear();
                }

                menu.OptionGroups.Clear();
                base.UnitOfWork.Menus.Remove(menu);
                base.UnitOfWork.Complete();
                msg.Data = menu.ID;
                msg.Success = true;
            });
        }


        public IServiceMessage<MenuDTO> CreateOrUpdate(MenuDTO dto, bool updateStatus)
        {
            return base.ProcessMessage<MenuDTO>(msg =>
            {
                Menu entity = null;
                if (dto.ID > 0)
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

                if (entity != null && entity.Status <= MenuStatus.Draft)
                {
                    validateCreateUpdateMenu(dto, entity);

                    handleUpdateMenuMetadata(dto, entity);
                    handleUpdateMenuEntries(dto.MenuEntries, entity.MenuEntries);
                    handleUpdateMenuOptionGroups(dto.OptionGroups, entity.OptionGroups);
                }

                if (updateStatus)
                {
                    validateUpdateMenuStatus(entity);

                    entity.Status += 1;
                    if (entity.Status == MenuStatus.Active)
                    {
                        var activeMenu = base.UnitOfWork.Menus.GetActive();
                        if (activeMenu != null)
                        {
                            activeMenu.Status = MenuStatus.Saved;
                        }
                    };

                }

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

        private ICollection<MenuEntry> handleUpdateMenuEntries(IEnumerable<MenuEntryDTO> dtos, ICollection<MenuEntry> entities)
        {
            entities.CreateUpdateDelete(
                dtos: dtos,
                dtoKey: dto => dto.ID,
                entityKey: entity => entity.ID,
                create: dto =>
                {
                    entities.Add(new MenuEntry()
                    {
                        Name = dto.Name,
                        Summary = dto.Summary,
                        MenuItems = handleUpdateMenuItems(dto.MenuItems, new List<MenuItem>()),
                    });
                },
                update: (entity, dto) =>
                {
                    entity.Name = dto.Name;
                    entity.Summary = dto.Summary;
                    handleUpdateMenuItems(dto.MenuItems, entity.MenuItems);
                },
                delete: entity =>
                {
                    entities.Remove(entity);
                });

            return entities;
        }

        private ICollection<MenuItem> handleUpdateMenuItems(IEnumerable<MenuItemDTO> dtos, ICollection<MenuItem> entities)
        {
            entities.CreateUpdateDelete(
              dtos: dtos,
              dtoKey: dto => dto.ID,
              entityKey: entity => entity.ID,
              create: dto =>
              {
                  entities.Add(new MenuItem()
                  {
                      Name = dto.Name,
                      Summary = dto.Summary,
                      CanAddSides = dto.CanAddSides,
                      OptionPriceMultiplier = dto.OptionPriceMultiplier,
                      Price = dto.Price,
                      MenuOptionGroups = string.Join(MenuItem.Seperator, dto.OptionGroupNames)
                  });
              },
              update: (entity, dto) =>
              {
                  entity.Name = dto.Name;
                  entity.Summary = dto.Summary;
                  entity.CanAddSides = dto.CanAddSides;
                  entity.OptionPriceMultiplier = dto.OptionPriceMultiplier;
                  entity.Price = dto.Price;
                  entity.MenuOptionGroups = string.Join(MenuItem.Seperator, dto.OptionGroupNames);
              },
              delete: entity =>
              {
                  entities.Remove(entity);
              });

            return entities;
        }

        private ICollection<MenuOptionGroup> handleUpdateMenuOptionGroups(IDictionary<string, IEnumerable<MenuOptionDTO>> dtosSource, ICollection<MenuOptionGroup> entities)
        {
            var dtos = dtosSource.ToDictionary(x => x.Key.ToLower(), x => x.Value);
            foreach (var entity in entities.ToList())
            {
                var entityName = entity.Name.ToLower();
                if (dtos.TryGetValue(entityName, out IEnumerable<MenuOptionDTO> optionDtos))
                {
                    handleUpdateGroupOptionItems(optionDtos, entity.MenuOptionItems);
                    dtos.Remove(entityName);
                }
                else
                {
                    entities.Remove(entity);
                }
            }

            foreach (var dto in dtos)
            {
                entities.Add(new MenuOptionGroup()
                {
                    Name = dto.Key,
                    MenuOptionItems = handleUpdateGroupOptionItems(dto.Value, new List<MenuOptionItem>())
                });
            }
            return entities;
        }

        private ICollection<MenuOptionItem> handleUpdateGroupOptionItems(IEnumerable<MenuOptionDTO> dtos, ICollection<MenuOptionItem> entities)
        {
            entities.CreateUpdateDelete(
              dtos: dtos,
              dtoKey: dto => dto.ID,
              entityKey: entity => entity.ID,
              create: dto =>
              {
                  entities.Add(new MenuOptionItem()
                  {
                      Name = dto.Name,
                      Price = dto.Price
                  });
              },
              update: (entity, dto) =>
              {
                  entity.Name = dto.Name;
                  entity.Price = dto.Price;
              },
              delete: entity =>
              {
                  entities.Remove(entity);
              });

            return entities;
        }

        #endregion


        #region validator

        private void validateUpdateMenuStatus(Menu entity)
        {
            base.HandleValidation(msg =>
            {
                if (entity is null)
                {
                    msg.Add("Menu cannot found");
                }
                else
                {
                    if (entity.Status == MenuStatus.Active)
                    {
                        msg.Add($"Cannot update the status of a Active menu");
                    }
                }
            });
        }


        private void validateCreateUpdateMenu(MenuDTO dto, Menu entity)
        {
            base.HandleValidation(msg =>
            {
                if (entity is null)
                {
                    msg.Add("Menu cannot found");
                }
                else if (entity.Status != MenuStatus.Draft)
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

        private void validateRemoveMenu(Menu entity)
        {
            base.HandleValidation(msg =>
            {
                if (entity is null)
                {
                    msg.Add("Menu cannot found");
                }
                else if (entity.Status != MenuStatus.Draft)
                {
                    msg.Add("Only draft menu can be removed");
                }
            });
        }
        #endregion
    }
}
