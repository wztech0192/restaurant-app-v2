using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class change_menu_name : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Version",
                table: "Menus");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Menus",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 14, 15, 8, 1, 279, DateTimeKind.Local).AddTicks(9457), "$2a$11$GiM/EcCMRdNVlUht4kzxbu4M6RoqojreUtIjHBm20TpSCFz8vGLU2" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Menus");

            migrationBuilder.AddColumn<string>(
                name: "Version",
                table: "Menus",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 4, 14, 5, 11, 579, DateTimeKind.Local).AddTicks(8130), "$2a$11$De3IOvGiBLGm8xXZQGwUAOdKvkZ.C/odVE/qpjtSU1kDbXkTSihyC" });
        }
    }
}
