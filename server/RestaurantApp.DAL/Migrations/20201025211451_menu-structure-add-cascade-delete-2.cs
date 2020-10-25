using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class menustructureaddcascadedelete2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 25, 17, 14, 50, 494, DateTimeKind.Local).AddTicks(4233), "$2a$11$A1cjIxmAoqtrtlJPuY/6M.VbhzyhyhGnQCqKyczCPC9v0x4/OP1oe" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 25, 17, 11, 46, 196, DateTimeKind.Local).AddTicks(3180), "$2a$11$5bo1TLIQjyyuYPzqR5flzeHv5HKasgg4ATN3Q5.hLdIztEKIiN2tq" });
        }
    }
}
