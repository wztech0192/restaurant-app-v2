using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class update_text_to_double : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Tax",
                table: "Menus",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 18, 15, 6, 40, 576, DateTimeKind.Local).AddTicks(5061), "$2a$11$jJofTy0HYV8Eg4aga5QHXOUUSKAUeJbY7vm4679ngwas6PsKEzPMa" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Tax",
                table: "Menus",
                type: "int",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 17, 16, 58, 37, 28, DateTimeKind.Local).AddTicks(4036), "$2a$11$15F1xd.5Csdvbby93FlxQeTpYI4jjKEvFLfkYEjq/HLLW6DXCzZ6u" });
        }
    }
}
