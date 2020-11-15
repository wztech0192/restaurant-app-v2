using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class modify_order_entities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "OrderedItems",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Key",
                table: "OrderedItemMenuOptionItems",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 15, 1, 21, 58, 667, DateTimeKind.Local).AddTicks(680), "$2a$11$uoJ7Er6iwAy2HbvH5jGwJ.FBQPGZau3VDiyMxzf5vHAABxUezme3K" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "OrderedItems");

            migrationBuilder.DropColumn(
                name: "Key",
                table: "OrderedItemMenuOptionItems");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 15, 0, 39, 14, 144, DateTimeKind.Local).AddTicks(138), "$2a$11$QdKSOZGlDcZBl0kCBYhiMups3Ys.BW9xo7OEKA.t6xCEkVMIX9ZKi" });
        }
    }
}
