using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class menustructureaddcascadedelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 25, 17, 11, 46, 196, DateTimeKind.Local).AddTicks(3180), "$2a$11$5bo1TLIQjyyuYPzqR5flzeHv5HKasgg4ATN3Q5.hLdIztEKIiN2tq" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 25, 16, 37, 47, 25, DateTimeKind.Local).AddTicks(4759), "$2a$11$xV6RPBhyFWrNKoh3iB0b1OcGQdXQxBRd1U7L4kzdd/0ZNHPEkg6Yu" });
        }
    }
}
