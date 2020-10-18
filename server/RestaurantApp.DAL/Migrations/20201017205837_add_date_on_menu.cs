using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class add_date_on_menu : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Menus",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedOn",
                table: "Menus",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 17, 16, 58, 37, 28, DateTimeKind.Local).AddTicks(4036), "$2a$11$15F1xd.5Csdvbby93FlxQeTpYI4jjKEvFLfkYEjq/HLLW6DXCzZ6u" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Menus");

            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "Menus");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 14, 15, 8, 1, 279, DateTimeKind.Local).AddTicks(9457), "$2a$11$GiM/EcCMRdNVlUht4kzxbu4M6RoqojreUtIjHBm20TpSCFz8vGLU2" });
        }
    }
}
