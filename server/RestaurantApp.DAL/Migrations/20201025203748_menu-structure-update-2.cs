using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class menustructureupdate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 25, 16, 37, 47, 25, DateTimeKind.Local).AddTicks(4759), "$2a$11$xV6RPBhyFWrNKoh3iB0b1OcGQdXQxBRd1U7L4kzdd/0ZNHPEkg6Yu" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 25, 16, 37, 14, 599, DateTimeKind.Local).AddTicks(1960), "$2a$11$EBbj8GIJ9.kM.HHrND03O.00c92FH2vNMZUugL2.fJ.b3pCsR2aGS" });
        }
    }
}
