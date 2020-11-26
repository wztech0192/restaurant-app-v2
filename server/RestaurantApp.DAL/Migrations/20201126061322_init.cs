using System;
using Microsoft.EntityFrameworkCore.Metadata;
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
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Password = table.Column<string>(maxLength: 100, nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Phone = table.Column<string>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    Role = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Menus",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Tax = table.Column<double>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UpdatedOn = table.Column<DateTime>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menus", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "OrderRules",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    ActiveTarget = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderRules", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Cards",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EncryptedCardInfo = table.Column<string>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    UseAsDefault = table.Column<bool>(nullable: false),
                    LastFourDigit = table.Column<string>(maxLength: 4, nullable: true),
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
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Active = table.Column<bool>(nullable: false),
                    Summary = table.Column<string>(nullable: true),
                    MenuID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuEntries", x => x.ID);
                    table.ForeignKey(
                        name: "FK_MenuEntries_Menus_MenuID",
                        column: x => x.MenuID,
                        principalTable: "Menus",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MenuOptionGroups",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    MenuID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuOptionGroups", x => x.ID);
                    table.ForeignKey(
                        name: "FK_MenuOptionGroups_Menus_MenuID",
                        column: x => x.MenuID,
                        principalTable: "Menus",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    EncryptedCardInfo = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(maxLength: 10, nullable: true),
                    Name = table.Column<string>(maxLength: 40, nullable: true),
                    Tip = table.Column<double>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    AdditionalRequest = table.Column<string>(nullable: true),
                    AccountID = table.Column<int>(nullable: true),
                    MenuID = table.Column<int>(nullable: false)
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
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderRuleTimeRanges",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DaysOfWeek = table.Column<string>(nullable: true),
                    Start = table.Column<string>(nullable: true),
                    Stop = table.Column<string>(nullable: true),
                    OrderRuleID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderRuleTimeRanges", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OrderRuleTimeRanges_OrderRules_OrderRuleID",
                        column: x => x.OrderRuleID,
                        principalTable: "OrderRules",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MenuItems",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Active = table.Column<bool>(nullable: false),
                    Summary = table.Column<string>(nullable: true),
                    Price = table.Column<double>(nullable: false),
                    OptionPriceMultiplier = table.Column<double>(nullable: false),
                    CanAddSides = table.Column<bool>(nullable: false),
                    MenuEntryID = table.Column<int>(nullable: false),
                    MenuOptionGroups = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuItems", x => x.ID);
                    table.ForeignKey(
                        name: "FK_MenuItems_MenuEntries_MenuEntryID",
                        column: x => x.MenuEntryID,
                        principalTable: "MenuEntries",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MenuOptionItems",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    GroupID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuOptionItems", x => x.ID);
                    table.ForeignKey(
                        name: "FK_MenuOptionItems_MenuOptionGroups_GroupID",
                        column: x => x.GroupID,
                        principalTable: "MenuOptionGroups",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderedItems",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Quantity = table.Column<int>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    AdditionalRequest = table.Column<string>(nullable: true),
                    OrderID = table.Column<int>(nullable: false),
                    MenuItemID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderedItems", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OrderedItems_MenuItems_MenuItemID",
                        column: x => x.MenuItemID,
                        principalTable: "MenuItems",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_OrderedItems_Orders_OrderID",
                        column: x => x.OrderID,
                        principalTable: "Orders",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "OrderedItemMenuOptionItems",
                columns: table => new
                {
                    Key = table.Column<string>(nullable: false),
                    OrderedItemID = table.Column<int>(nullable: false),
                    MenuOptionItemID = table.Column<int>(nullable: false),
                    Quantity = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderedItemMenuOptionItems", x => new { x.MenuOptionItemID, x.OrderedItemID, x.Key });
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

            migrationBuilder.InsertData(
                table: "Accounts",
                columns: new[] { "ID", "CreatedOn", "Name", "Password", "Phone", "Role" },
                values: new object[] { 1, new DateTime(2020, 11, 26, 1, 13, 22, 23, DateTimeKind.Local).AddTicks(909), "Manager", "$2a$11$nILgRZIyxNGXQsDBWGxG3OLafmwWxSy1AV8ppC/fDVNAUWvNvoZHi", "8032260689", "Manager" });

            migrationBuilder.InsertData(
                table: "OrderRules",
                columns: new[] { "ID", "ActiveTarget", "Name" },
                values: new object[] { 1, true, "Global" });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_Phone",
                table: "Accounts",
                column: "Phone",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Cards_AccountID",
                table: "Cards",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_MenuEntries_MenuID",
                table: "MenuEntries",
                column: "MenuID");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItems_MenuEntryID",
                table: "MenuItems",
                column: "MenuEntryID");

            migrationBuilder.CreateIndex(
                name: "IX_MenuOptionGroups_MenuID",
                table: "MenuOptionGroups",
                column: "MenuID");

            migrationBuilder.CreateIndex(
                name: "IX_MenuOptionItems_GroupID",
                table: "MenuOptionItems",
                column: "GroupID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderedItemMenuOptionItems_OrderedItemID",
                table: "OrderedItemMenuOptionItems",
                column: "OrderedItemID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderedItems_MenuItemID",
                table: "OrderedItems",
                column: "MenuItemID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderedItems_OrderID",
                table: "OrderedItems",
                column: "OrderID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderRuleTimeRanges_OrderRuleID",
                table: "OrderRuleTimeRanges",
                column: "OrderRuleID");

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
                name: "OrderedItemMenuOptionItems");

            migrationBuilder.DropTable(
                name: "OrderRuleTimeRanges");

            migrationBuilder.DropTable(
                name: "MenuOptionItems");

            migrationBuilder.DropTable(
                name: "OrderedItems");

            migrationBuilder.DropTable(
                name: "OrderRules");

            migrationBuilder.DropTable(
                name: "MenuOptionGroups");

            migrationBuilder.DropTable(
                name: "MenuItems");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "MenuEntries");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Menus");
        }
    }
}
