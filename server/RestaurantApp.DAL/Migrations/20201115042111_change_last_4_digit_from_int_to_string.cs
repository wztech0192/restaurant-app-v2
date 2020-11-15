using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class change_last_4_digit_from_int_to_string : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "LastFourDigit",
                table: "Cards",
                maxLength: 4,
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 14, 23, 21, 10, 334, DateTimeKind.Local).AddTicks(8860), "$2a$11$b8ludwvNeEZvPaFjhiSOFOe192RQI3JzLwbEcWUF2U4Y9Tpg9dzWS" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "LastFourDigit",
                table: "Cards",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 4,
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 14, 16, 4, 8, 706, DateTimeKind.Local).AddTicks(2173), "$2a$11$pJLPm9fzwsSfBeLTyrwNPeaf6At699sDnyKDXL.vEz3eLxUN3Jnsq" });
        }
    }
}
