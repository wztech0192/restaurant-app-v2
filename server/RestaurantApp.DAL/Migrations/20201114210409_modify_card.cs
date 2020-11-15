using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class modify_card : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HolderName",
                table: "Cards");

            migrationBuilder.AddColumn<bool>(
                name: "UseAsDefault",
                table: "Cards",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 14, 16, 4, 8, 706, DateTimeKind.Local).AddTicks(2173), "$2a$11$pJLPm9fzwsSfBeLTyrwNPeaf6At699sDnyKDXL.vEz3eLxUN3Jnsq" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UseAsDefault",
                table: "Cards");

            migrationBuilder.AddColumn<string>(
                name: "HolderName",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 14, 15, 27, 54, 661, DateTimeKind.Local).AddTicks(1895), "$2a$11$JUE2L9rm5uorAQywSO0Miez28pCBl8vMffgmQAmEDv4Z/kCRewyMu" });
        }
    }
}
