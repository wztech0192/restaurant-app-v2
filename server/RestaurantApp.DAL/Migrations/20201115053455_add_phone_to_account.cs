using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class add_phone_to_account : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Accounts",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password", "Phone" },
                values: new object[] { new DateTime(2020, 11, 15, 0, 34, 54, 285, DateTimeKind.Local).AddTicks(4388), "$2a$11$xBwJ56B6y0KrasLMQT5pQespzbh8bWG0MhpWZi9lxcFjyseZbyd/q", "8032260689" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Accounts");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 15, 0, 16, 8, 352, DateTimeKind.Local).AddTicks(2619), "$2a$11$PvdrTio/UyT8AEB2Q3dXhex3MN52SLOwW.Yj8riFZe4lD.otjRmQS" });
        }
    }
}
