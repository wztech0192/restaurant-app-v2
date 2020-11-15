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
                .OnDelete(DeleteBehavior.Cascade);

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

            seeding(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }
    }
}
