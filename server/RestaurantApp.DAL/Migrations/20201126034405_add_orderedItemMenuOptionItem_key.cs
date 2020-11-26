using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class add_orderedItemMenuOptionItem_key : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderedItemMenuOptionItems",
                table: "OrderedItemMenuOptionItems");

            migrationBuilder.AlterColumn<string>(
                name: "Key",
                table: "OrderedItemMenuOptionItems",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderedItemMenuOptionItems",
                table: "OrderedItemMenuOptionItems",
                columns: new[] { "MenuOptionItemID", "OrderedItemID", "Key" });

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 25, 22, 44, 4, 787, DateTimeKind.Local).AddTicks(6777), "$2a$11$aczh6xc9CBwjQ3yNP9N8d.i//skEq4jgU.82yZyvwQwi3Rzc1bFK6" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderedItemMenuOptionItems",
                table: "OrderedItemMenuOptionItems");

            migrationBuilder.AlterColumn<string>(
                name: "Key",
                table: "OrderedItemMenuOptionItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderedItemMenuOptionItems",
                table: "OrderedItemMenuOptionItems",
                columns: new[] { "MenuOptionItemID", "OrderedItemID" });

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 22, 1, 16, 34, 17, DateTimeKind.Local).AddTicks(9982), "$2a$11$mDVnZFog5hTrNkIcoy/RzOzxgSGG4/YCAkyRAZtTXXMoK66ptpD2W" });
        }
    }
}
