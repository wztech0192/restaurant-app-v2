using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class menustructureupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuOptionItems_Menus_MenuID",
                table: "MenuOptionItems");

            migrationBuilder.DropForeignKey(
                name: "FK_MenuOptionItems_MenuOptionGroups_MenuOptionGroupID",
                table: "MenuOptionItems");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderedItems_Accounts_AccountID",
                table: "OrderedItems");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderedItems_Menus_MenuID",
                table: "OrderedItems");

            migrationBuilder.DropTable(
                name: "MenuItemMenuOptionGroups");

            migrationBuilder.DropIndex(
                name: "IX_OrderedItems_AccountID",
                table: "OrderedItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderedItems_MenuID",
                table: "OrderedItems");

            migrationBuilder.DropIndex(
                name: "IX_MenuOptionItems_MenuID",
                table: "MenuOptionItems");

            migrationBuilder.DropIndex(
                name: "IX_MenuOptionItems_MenuOptionGroupID",
                table: "MenuOptionItems");

            migrationBuilder.DropColumn(
                name: "AccountID",
                table: "OrderedItems");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "OrderedItems");

            migrationBuilder.DropColumn(
                name: "EncryptedCardInfo",
                table: "OrderedItems");

            migrationBuilder.DropColumn(
                name: "MenuID",
                table: "OrderedItems");

            migrationBuilder.DropColumn(
                name: "Tip",
                table: "OrderedItems");

            migrationBuilder.DropColumn(
                name: "MenuID",
                table: "MenuOptionItems");

            migrationBuilder.DropColumn(
                name: "MenuOptionGroupID",
                table: "MenuOptionItems");

            migrationBuilder.AddColumn<int>(
                name: "MenuItemID",
                table: "OrderedItems",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GroupID",
                table: "MenuOptionItems",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MenuID",
                table: "MenuOptionGroups",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MenuOptionGroups",
                table: "MenuItems",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 25, 16, 4, 33, 878, DateTimeKind.Local).AddTicks(8918), "$2a$11$1VfFeXBZ9hd3HKNW8P/FWOzFW5o2.D4SoEIFQ./.Rl0aSJGwGg7iq" });

            migrationBuilder.CreateIndex(
                name: "IX_OrderedItems_MenuItemID",
                table: "OrderedItems",
                column: "MenuItemID");

            migrationBuilder.CreateIndex(
                name: "IX_MenuOptionItems_GroupID",
                table: "MenuOptionItems",
                column: "GroupID");

            migrationBuilder.CreateIndex(
                name: "IX_MenuOptionGroups_MenuID",
                table: "MenuOptionGroups",
                column: "MenuID");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuOptionGroups_Menus_MenuID",
                table: "MenuOptionGroups",
                column: "MenuID",
                principalTable: "Menus",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MenuOptionItems_MenuOptionGroups_GroupID",
                table: "MenuOptionItems",
                column: "GroupID",
                principalTable: "MenuOptionGroups",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderedItems_MenuItems_MenuItemID",
                table: "OrderedItems",
                column: "MenuItemID",
                principalTable: "MenuItems",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuOptionGroups_Menus_MenuID",
                table: "MenuOptionGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_MenuOptionItems_MenuOptionGroups_GroupID",
                table: "MenuOptionItems");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderedItems_MenuItems_MenuItemID",
                table: "OrderedItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderedItems_MenuItemID",
                table: "OrderedItems");

            migrationBuilder.DropIndex(
                name: "IX_MenuOptionItems_GroupID",
                table: "MenuOptionItems");

            migrationBuilder.DropIndex(
                name: "IX_MenuOptionGroups_MenuID",
                table: "MenuOptionGroups");

            migrationBuilder.DropColumn(
                name: "MenuItemID",
                table: "OrderedItems");

            migrationBuilder.DropColumn(
                name: "GroupID",
                table: "MenuOptionItems");

            migrationBuilder.DropColumn(
                name: "MenuID",
                table: "MenuOptionGroups");

            migrationBuilder.DropColumn(
                name: "MenuOptionGroups",
                table: "MenuItems");

            migrationBuilder.AddColumn<int>(
                name: "AccountID",
                table: "OrderedItems",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "OrderedItems",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "EncryptedCardInfo",
                table: "OrderedItems",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MenuID",
                table: "OrderedItems",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Tip",
                table: "OrderedItems",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "MenuID",
                table: "MenuOptionItems",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MenuOptionGroupID",
                table: "MenuOptionItems",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MenuItemMenuOptionGroups",
                columns: table => new
                {
                    MenuItemID = table.Column<int>(type: "int", nullable: false),
                    MenuOptionGroupID = table.Column<int>(type: "int", nullable: false)
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

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 18, 15, 6, 40, 576, DateTimeKind.Local).AddTicks(5061), "$2a$11$jJofTy0HYV8Eg4aga5QHXOUUSKAUeJbY7vm4679ngwas6PsKEzPMa" });

            migrationBuilder.CreateIndex(
                name: "IX_OrderedItems_AccountID",
                table: "OrderedItems",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderedItems_MenuID",
                table: "OrderedItems",
                column: "MenuID");

            migrationBuilder.CreateIndex(
                name: "IX_MenuOptionItems_MenuID",
                table: "MenuOptionItems",
                column: "MenuID");

            migrationBuilder.CreateIndex(
                name: "IX_MenuOptionItems_MenuOptionGroupID",
                table: "MenuOptionItems",
                column: "MenuOptionGroupID");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItemMenuOptionGroups_MenuOptionGroupID",
                table: "MenuItemMenuOptionGroups",
                column: "MenuOptionGroupID");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuOptionItems_Menus_MenuID",
                table: "MenuOptionItems",
                column: "MenuID",
                principalTable: "Menus",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MenuOptionItems_MenuOptionGroups_MenuOptionGroupID",
                table: "MenuOptionItems",
                column: "MenuOptionGroupID",
                principalTable: "MenuOptionGroups",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderedItems_Accounts_AccountID",
                table: "OrderedItems",
                column: "AccountID",
                principalTable: "Accounts",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderedItems_Menus_MenuID",
                table: "OrderedItems",
                column: "MenuID",
                principalTable: "Menus",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
