using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class add_rule_cascade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderRuleTimeRanges_OrderRules_OrderRuleID",
                table: "OrderRuleTimeRanges");

            migrationBuilder.AlterColumn<int>(
                name: "OrderRuleID",
                table: "OrderRuleTimeRanges",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 22, 1, 16, 34, 17, DateTimeKind.Local).AddTicks(9982), "$2a$11$mDVnZFog5hTrNkIcoy/RzOzxgSGG4/YCAkyRAZtTXXMoK66ptpD2W" });

            migrationBuilder.AddForeignKey(
                name: "FK_OrderRuleTimeRanges_OrderRules_OrderRuleID",
                table: "OrderRuleTimeRanges",
                column: "OrderRuleID",
                principalTable: "OrderRules",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderRuleTimeRanges_OrderRules_OrderRuleID",
                table: "OrderRuleTimeRanges");

            migrationBuilder.AlterColumn<int>(
                name: "OrderRuleID",
                table: "OrderRuleTimeRanges",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 21, 18, 10, 37, 968, DateTimeKind.Local).AddTicks(3303), "$2a$11$YKyzQEXjRVdb3YIKqDsYl.G8YJI9h2r1r1iKnlXWU6KUQ.OUMU5ei" });

            migrationBuilder.AddForeignKey(
                name: "FK_OrderRuleTimeRanges_OrderRules_OrderRuleID",
                table: "OrderRuleTimeRanges",
                column: "OrderRuleID",
                principalTable: "OrderRules",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
