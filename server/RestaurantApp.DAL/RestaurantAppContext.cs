using Microsoft.EntityFrameworkCore;
using RestaurantApp.DAL.Models;
using System;

namespace RestaurantApp.DAL
{
    public class RestaurantAppContext : DbContext
    {


        public RestaurantAppContext(DbContextOptions<RestaurantAppContext> options)
        : base(options)
        { }


        public DbSet<Account> Accounts { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderedItem> OrderedItems { get; set; }
        public DbSet<OrderedItemMenuOptionItem> OrderedItemMenuOptionItems { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<MenuEntry> MenuEntries { get; set; }
        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<MenuOptionGroup> MenuOptionGroups { get; set; }
        public DbSet<MenuOptionItem> MenuOptionItems { get; set; }

        public DbSet<OrderRule> OrderRules { get; set; }
        public DbSet<OrderRuleTimeRange> OrderRuleTimeRanges { get; set; }


        private void seeding(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>().HasData(
                new Account
                {
                    ID = 1,
                    CreatedOn = DateTime.Now,
                    Password = BCrypt.Net.BCrypt.HashPassword("weijie0192"),
                    Name = "Manager",
                    Phone = "8032260689",
                    Role = "Manager"
                }
            );

            modelBuilder.Entity<OrderRule>().HasData(new OrderRule
            {
                ID = 1,
                ActiveTarget = true,
                Name = "Global"
            });
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Account>()
                .HasIndex(a => a.Phone)
                .IsUnique();

            modelBuilder.Entity<OrderedItemMenuOptionItem>()
                .HasKey(x => new { x.MenuOptionItemID, x.OrderedItemID });

            modelBuilder.Entity<OrderedItemMenuOptionItem>()
                .HasOne(x => x.OrderedItem)
                .WithMany(y => y.OrderedOptions)
                .HasForeignKey(x => x.OrderedItemID);

            modelBuilder.Entity<OrderedItemMenuOptionItem>()
                   .HasOne(x => x.MenuOptionItem)
                   .WithMany(y => y.OrderedItems)
                   .HasForeignKey(x => x.MenuOptionItemID);

            modelBuilder.Entity<OrderedItem>()
                .HasOne(x => x.MenuItem)
                .WithMany(x => x.OrderedItems)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<OrderedItem>()
              .HasOne(x => x.Order)
              .WithMany(x => x.OrderedItems)
              .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<MenuOptionGroup>()
              .HasOne(x => x.Menu)
              .WithMany(x => x.OptionGroups)
              .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MenuOptionItem>()
               .HasOne(x => x.Group)
               .WithMany(x => x.MenuOptionItems)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MenuEntry>()
               .HasOne(x => x.Menu)
               .WithMany(x => x.MenuEntries)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MenuItem>()
            .HasOne(x => x.MenuEntry)
            .WithMany(x => x.MenuItems)
            .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<OrderRuleTimeRange>()
               .HasOne(x => x.OrderRule)
               .WithMany(x => x.ActiveTimes)
               .OnDelete(DeleteBehavior.Cascade);



            seeding(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }
    }
}
