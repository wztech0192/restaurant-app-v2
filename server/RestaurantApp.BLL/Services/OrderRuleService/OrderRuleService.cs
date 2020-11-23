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
    internal class OrderRuleService : BaseService, IOrderRuleService
    {

        public OrderRuleService(
            IUnitOfWork unitOfWork,
            IOptions<AppSettings> appSettingOptions,
            IJWTService jwtService)
            : base(unitOfWork, appSettingOptions, jwtService)
        {
        }

        public IServiceMessage<IDictionary<string, OrderRuleDTO>> Get()
        {
            return base.ProcessMessage<IDictionary<string, OrderRuleDTO>>(msg =>
            {
                msg.Data = base.UnitOfWork.OrderRules
                    .GetAll()
                    .ToDictionary(x => x.Name.ToLower(), x => new OrderRuleDTO(x));
                msg.Success = true;
            });
        }

        public IServiceMessage<bool> Remove(string ruleName)
        {
            return base.ProcessMessage<bool>(msg =>
            {
                var entity = base.UnitOfWork.OrderRules.GetByName(ruleName);
                entity.ActiveTimes.Clear();
                base.UnitOfWork.OrderRules.Remove(entity);
                base.UnitOfWork.Complete();
                msg.Success = true;
            });
        }

        public IServiceMessage<OrderRuleDTO> CreateOrUpdate(OrderRuleDTO dto)
        {
            return base.ProcessMessage<OrderRuleDTO>(msg =>
            {
                var entity = base.UnitOfWork.OrderRules.GetByName(dto.Name);

                if (entity is null)
                {
                    entity = new OrderRule()
                    {
                        Name = dto.Name,
                    };
                    base.UnitOfWork.OrderRules.Add(entity);
                }

                entity.ActiveTarget = dto.ActiveTarget;

                entity.ActiveTimes.CreateUpdateDelete(
                  dtos: dto.ActiveTimes,
                  dtoKey: dto => dto.ID,
                  entityKey: entity => entity.ID,
                  create: (dto, update) =>
                  {
                      var orderRuleTimeRange = new OrderRuleTimeRange();
                      update(orderRuleTimeRange, dto);
                      entity.ActiveTimes.Add(orderRuleTimeRange);
                  },
                  update: (entity, dto) =>
                  {
                      entity.DaysOfWeek = string.Join(OrderRuleTimeRangeDTO.Separator, dto.DaysOfWeek);
                      entity.Start = dto.Start;
                      entity.Stop = dto.Stop;
                  },
                  delete: timeEntity =>
                  {
                      entity.ActiveTimes.Remove(timeEntity);
                  });

                base.UnitOfWork.Complete();

                msg.Data = new OrderRuleDTO(entity);
                msg.Success = true;
            });
        }

        public bool ValidateRule(IDictionary<string, OrderRuleDTO> orderRules, string name)
        {
            if(orderRules.TryGetValue(name.ToLower(), out OrderRuleDTO rule))
            {
                if(!rule.ActiveTarget || !validateTime(rule.ActiveTimes))
                {
                    return false;
                }
            }

            return true;
        }

        private bool validateTime(IEnumerable<OrderRuleTimeRangeDTO> activeTimes)
        {
            var now = DateTime.Now;
            var day = (int)now.DayOfWeek;
            var nowTime = DateTime.Now.TimeOfDay;

            foreach (var time in activeTimes)
            {
                if (time.IsValid)
                {
                    var start = TimeSpan.Parse(time.Start);
                    var end = TimeSpan.Parse(time.Stop);
                    if (!time.DaysOfWeek.Contains(day) || !((nowTime > start) && (nowTime < end)))
                    {
                    
                        return false;
                    }
                }
            }
            return true;
        }
    }
}
