using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class modify_order : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Total",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Total",
                table: "OrderedItems");

            migrationBuilder.AddColumn<string>(
                name: "AdditionalRequest",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Orders",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "AdditionalRequest",
                table: "OrderedItems",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "OrderedItems",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "OrderedItemMenuOptionItems",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 14, 15, 27, 54, 661, DateTimeKind.Local).AddTicks(1895), "$2a$11$JUE2L9rm5uorAQywSO0Miez28pCBl8vMffgmQAmEDv4Z/kCRewyMu" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdditionalRequest",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "AdditionalRequest",
                table: "OrderedItems");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "OrderedItems");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "OrderedItemMenuOptionItems");

            migrationBuilder.AddColumn<double>(
                name: "Total",
                table: "Orders",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Total",
                table: "OrderedItems",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 25, 17, 14, 50, 494, DateTimeKind.Local).AddTicks(4233), "$2a$11$A1cjIxmAoqtrtlJPuY/6M.VbhzyhyhGnQCqKyczCPC9v0x4/OP1oe" });
        }
    }
}
