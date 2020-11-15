using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class add_name_and_phone_to_order : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Orders",
                maxLength: 40,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Orders",
                maxLength: 10,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 15, 0, 16, 8, 352, DateTimeKind.Local).AddTicks(2619), "$2a$11$PvdrTio/UyT8AEB2Q3dXhex3MN52SLOwW.Yj8riFZe4lD.otjRmQS" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Orders");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 14, 23, 21, 10, 334, DateTimeKind.Local).AddTicks(8860), "$2a$11$b8ludwvNeEZvPaFjhiSOFOe192RQI3JzLwbEcWUF2U4Y9Tpg9dzWS" });
        }
    }
}
