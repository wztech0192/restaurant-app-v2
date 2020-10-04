using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class make_account_email_unique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 4, 14, 5, 11, 579, DateTimeKind.Local).AddTicks(8130), "$2a$11$De3IOvGiBLGm8xXZQGwUAOdKvkZ.C/odVE/qpjtSU1kDbXkTSihyC" });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_Email",
                table: "Accounts",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Accounts_Email",
                table: "Accounts");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 3, 18, 19, 23, 691, DateTimeKind.Local).AddTicks(9955), "$2a$11$tFb2Nf/vruvnN7ZwOrKt7O2FcgOsqdaFtsj5QoyWJxZqxnQGPF/kG" });
        }
    }
}
