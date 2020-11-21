using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class add_rule : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrderRules",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    ActiveTarget = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderRules", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "OrderRuleTimeRanges",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DaysOfWeek = table.Column<string>(nullable: true),
                    Start = table.Column<string>(nullable: true),
                    Stop = table.Column<string>(nullable: true),
                    OrderRuleID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderRuleTimeRanges", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OrderRuleTimeRanges_OrderRules_OrderRuleID",
                        column: x => x.OrderRuleID,
                        principalTable: "OrderRules",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 21, 18, 10, 37, 968, DateTimeKind.Local).AddTicks(3303), "$2a$11$YKyzQEXjRVdb3YIKqDsYl.G8YJI9h2r1r1iKnlXWU6KUQ.OUMU5ei" });

            migrationBuilder.InsertData(
                table: "OrderRules",
                columns: new[] { "ID", "ActiveTarget", "Name" },
                values: new object[] { 1, true, "Global" });

            migrationBuilder.CreateIndex(
                name: "IX_OrderRuleTimeRanges_OrderRuleID",
                table: "OrderRuleTimeRanges",
                column: "OrderRuleID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderRuleTimeRanges");

            migrationBuilder.DropTable(
                name: "OrderRules");

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 11, 18, 18, 37, 53, 746, DateTimeKind.Local).AddTicks(6257), "$2a$11$GlQzkJFtH69a99d0m47bMOwdbX5edMnoEGtmfvU23y5Ai5oBWyFNS" });
        }
    }
}
