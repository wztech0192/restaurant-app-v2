using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.DAL.Migrations
{
    public partial class make_role_required : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "Accounts",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 3, 18, 19, 23, 691, DateTimeKind.Local).AddTicks(9955), "$2a$11$tFb2Nf/vruvnN7ZwOrKt7O2FcgOsqdaFtsj5QoyWJxZqxnQGPF/kG" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreatedOn", "Password" },
                values: new object[] { new DateTime(2020, 10, 3, 16, 18, 17, 336, DateTimeKind.Local).AddTicks(8679), "$2a$11$s/z.ks83dp/wDmb.zCwjReWh9pIV9ifj4Oc5RfRVPxWFiC6d6JqVO" });
        }
    }
}
