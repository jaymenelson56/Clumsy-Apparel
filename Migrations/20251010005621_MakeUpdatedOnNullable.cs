using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClumsyApparel.Migrations
{
    /// <inheritdoc />
    public partial class MakeUpdatedOnNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedOn",
                table: "OrderForms",
                type: "timestamp without time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "OrderForms",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "OrderForms",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "UpdatedOn" },
                values: new object[] { new DateTime(2025, 10, 10, 0, 56, 21, 37, DateTimeKind.Utc).AddTicks(5668), new DateTime(2025, 10, 10, 0, 56, 21, 37, DateTimeKind.Utc).AddTicks(5673) });

            migrationBuilder.UpdateData(
                table: "OrderForms",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedOn", "UpdatedOn" },
                values: new object[] { new DateTime(2025, 10, 10, 0, 56, 21, 37, DateTimeKind.Utc).AddTicks(5678), new DateTime(2025, 10, 10, 0, 56, 21, 37, DateTimeKind.Utc).AddTicks(5678) });

            migrationBuilder.UpdateData(
                table: "OrderForms",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedOn", "UpdatedOn" },
                values: new object[] { new DateTime(2025, 10, 10, 0, 56, 21, 37, DateTimeKind.Utc).AddTicks(5681), new DateTime(2025, 10, 10, 0, 56, 21, 37, DateTimeKind.Utc).AddTicks(5681) });

            migrationBuilder.UpdateData(
                table: "OrderForms",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedOn", "UpdatedOn" },
                values: new object[] { new DateTime(2025, 10, 10, 0, 56, 21, 37, DateTimeKind.Utc).AddTicks(5684), new DateTime(2025, 10, 10, 0, 56, 21, 37, DateTimeKind.Utc).AddTicks(5684) });

            migrationBuilder.UpdateData(
                table: "OrderForms",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CreatedOn", "UpdatedOn" },
                values: new object[] { new DateTime(2025, 10, 10, 0, 56, 21, 37, DateTimeKind.Utc).AddTicks(5686), new DateTime(2025, 10, 10, 0, 56, 21, 37, DateTimeKind.Utc).AddTicks(5687) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedOn",
                table: "OrderForms",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "OrderForms",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "OrderForms",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedOn", "UpdatedOn" },
                values: new object[] { new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3058), new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3060) });

            migrationBuilder.UpdateData(
                table: "OrderForms",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedOn", "UpdatedOn" },
                values: new object[] { new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3063), new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3064) });

            migrationBuilder.UpdateData(
                table: "OrderForms",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedOn", "UpdatedOn" },
                values: new object[] { new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3067), new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3067) });

            migrationBuilder.UpdateData(
                table: "OrderForms",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CreatedOn", "UpdatedOn" },
                values: new object[] { new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3071), new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3072) });

            migrationBuilder.UpdateData(
                table: "OrderForms",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CreatedOn", "UpdatedOn" },
                values: new object[] { new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3074), new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3075) });
        }
    }
}
