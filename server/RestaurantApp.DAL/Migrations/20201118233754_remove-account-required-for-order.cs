using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class removeaccountrequiredfororder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Accounts_AccountID",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "AccountID",
                table: "Orders",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 18, 18, 37, 53, 746, DateTimeKind.Local).AddTicks(6257), "$2a$11$GlQzkJFtH69a99d0m47bMOwdbX5edMnoEGtmfvU23y5Ai5oBWyFNS" });

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Accounts_AccountID",
                table: "Orders",
                column: "AccountID",
                principalTable: "Accounts",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Accounts_AccountID",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "AccountID",
                table: "Orders",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 15, 15, 0, 56, 15, DateTimeKind.Local).AddTicks(7827), "$2a$11$77z1fQ6IDOJKHbmvYpR6V.Q3yEPiBhrsdof7n9ufqFgLJioJkIsbu" });

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Accounts_AccountID",
                table: "Orders",
                column: "AccountID",
                principalTable: "Accounts",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
