using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(maxLength: 100, nullable: false),
                    Password = table.Column<string>(maxLength: 100, nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "MenuOptionGroups",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuOptionGroups", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Menus",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Version = table.Column<string>(nullable: false),
                    Tax = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menus", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Cards",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EncryptedCardInfo = table.Column<string>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    HolderName = table.Column<string>(nullable: true),
                    LastFourDigit = table.Column<int>(nullable: false),
                    AccountID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cards", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Cards_Accounts_AccountID",
                        column: x => x.AccountID,
                        principalTable: "Accounts",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MenuEntries",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    Active = table.Column<bool>(nullable: false),
                    Summary = table.Column<string>(nullable: true),
                    MenuID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuEntries", x => x.ID);
                    table.ForeignKey(
                        name: "FK_MenuEntries_Menus_MenuID",
                        column: x => x.MenuID,
                        principalTable: "Menus",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MenuOptionItems",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    MenuOptionGroupID = table.Column<int>(nullable: true),
                    MenuID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuOptionItems", x => x.ID);
                    table.ForeignKey(
                        name: "FK_MenuOptionItems_Menus_MenuID",
                        column: x => x.MenuID,
                        principalTable: "Menus",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MenuOptionItems_MenuOptionGroups_MenuOptionGroupID",
                        column: x => x.MenuOptionGroupID,
                        principalTable: "MenuOptionGroups",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    EncryptedCardInfo = table.Column<string>(nullable: true),
                    Tip = table.Column<double>(nullable: false),
                    Total = table.Column<double>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    AccountID = table.Column<int>(nullable: true),
                    MenuID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Orders_Accounts_AccountID",
                        column: x => x.AccountID,
                        principalTable: "Accounts",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Orders_Menus_MenuID",
                        column: x => x.MenuID,
                        principalTable: "Menus",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MenuItems",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    Active = table.Column<bool>(nullable: false),
                    Summary = table.Column<string>(nullable: true),
                    Price = table.Column<double>(nullable: false),
                    OptionPriceMultiplier = table.Column<double>(nullable: false),
                    CanAddSides = table.Column<bool>(nullable: false),
                    MenuEntryID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuItems", x => x.ID);
                    table.ForeignKey(
                        name: "FK_MenuItems_MenuEntries_MenuEntryID",
                        column: x => x.MenuEntryID,
                        principalTable: "MenuEntries",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OrderedItems",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    EncryptedCardInfo = table.Column<string>(nullable: true),
                    Tip = table.Column<double>(nullable: false),
                    Total = table.Column<double>(nullable: false),
                    AccountID = table.Column<int>(nullable: true),
                    MenuID = table.Column<int>(nullable: true),
                    OrderID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderedItems", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OrderedItems_Accounts_AccountID",
                        column: x => x.AccountID,
                        principalTable: "Accounts",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrderedItems_Menus_MenuID",
                        column: x => x.MenuID,
                        principalTable: "Menus",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrderedItems_Orders_OrderID",
                        column: x => x.OrderID,
                        principalTable: "Orders",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MenuItemMenuOptionGroups",
                columns: table => new
                {
                    MenuItemID = table.Column<int>(nullable: false),
                    MenuOptionGroupID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuItemMenuOptionGroups", x => new { x.MenuItemID, x.MenuOptionGroupID });
                    table.ForeignKey(
                        name: "FK_MenuItemMenuOptionGroups_MenuItems_MenuItemID",
                        column: x => x.MenuItemID,
                        principalTable: "MenuItems",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MenuItemMenuOptionGroups_MenuOptionGroups_MenuOptionGroupID",
                        column: x => x.MenuOptionGroupID,
                        principalTable: "MenuOptionGroups",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderedItemMenuOptionItems",
                columns: table => new
                {
                    OrderedItemID = table.Column<int>(nullable: false),
                    MenuOptionItemID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderedItemMenuOptionItems", x => new { x.MenuOptionItemID, x.OrderedItemID });
                    table.ForeignKey(
                        name: "FK_OrderedItemMenuOptionItems_MenuOptionItems_MenuOptionItemID",
                        column: x => x.MenuOptionItemID,
                        principalTable: "MenuOptionItems",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderedItemMenuOptionItems_OrderedItems_OrderedItemID",
                        column: x => x.OrderedItemID,
                        principalTable: "OrderedItems",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cards_AccountID",
                table: "Cards",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_MenuEntries_MenuID",
                table: "MenuEntries",
                column: "MenuID");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItemMenuOptionGroups_MenuOptionGroupID",
                table: "MenuItemMenuOptionGroups",
                column: "MenuOptionGroupID");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItems_MenuEntryID",
                table: "MenuItems",
                column: "MenuEntryID");

            migrationBuilder.CreateIndex(
                name: "IX_MenuOptionItems_MenuID",
                table: "MenuOptionItems",
                column: "MenuID");

            migrationBuilder.CreateIndex(
                name: "IX_MenuOptionItems_MenuOptionGroupID",
                table: "MenuOptionItems",
                column: "MenuOptionGroupID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderedItemMenuOptionItems_OrderedItemID",
                table: "OrderedItemMenuOptionItems",
                column: "OrderedItemID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderedItems_AccountID",
                table: "OrderedItems",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderedItems_MenuID",
                table: "OrderedItems",
                column: "MenuID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderedItems_OrderID",
                table: "OrderedItems",
                column: "OrderID");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_AccountID",
                table: "Orders",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_MenuID",
                table: "Orders",
                column: "MenuID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cards");

            migrationBuilder.DropTable(
                name: "MenuItemMenuOptionGroups");

            migrationBuilder.DropTable(
                name: "OrderedItemMenuOptionItems");

            migrationBuilder.DropTable(
                name: "MenuItems");

            migrationBuilder.DropTable(
                name: "MenuOptionItems");

            migrationBuilder.DropTable(
                name: "OrderedItems");

            migrationBuilder.DropTable(
                name: "MenuEntries");

            migrationBuilder.DropTable(
                name: "MenuOptionGroups");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Menus");
        }
    }
}
