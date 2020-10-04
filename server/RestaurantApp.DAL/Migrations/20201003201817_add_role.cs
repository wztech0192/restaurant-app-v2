using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class add_role : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Accounts",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password", "Role" },
                values: new object[] { new DateTime(2020, 10, 3, 16, 18, 17, 336, DateTimeKind.Local).AddTicks(8679), "$2a$11$s/z.ks83dp/wDmb.zCwjReWh9pIV9ifj4Oc5RfRVPxWFiC6d6JqVO", "Manager" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "Accounts");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 9, 30, 18, 40, 56, 267, DateTimeKind.Local).AddTicks(6730), "$2a$11$EUS5tspPIQF8P0W32W7FBOS/H3tlPahiTo4AU9tIfP3.2pTqvZmRi" });
        }
    }
}
