using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ClumsyApparel.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrderForms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    VinylType = table.Column<string>(type: "TEXT", nullable: false),
                    ShirtType = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    HoursLogged = table.Column<decimal>(type: "TEXT", nullable: false),
                    AmountOfErrors = table.Column<int>(type: "INTEGER", nullable: false),
                    NeededHelp = table.Column<bool>(type: "INTEGER", nullable: false),
                    Rating = table.Column<int>(type: "INTEGER", nullable: false),
                    Notes = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    ImageURL = table.Column<string>(type: "TEXT", nullable: true),
                    Fulfilled = table.Column<bool>(type: "INTEGER", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderForms", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "OrderForms",
                columns: new[] { "Id", "AmountOfErrors", "CreatedOn", "Fulfilled", "HoursLogged", "ImageURL", "NeededHelp", "Notes", "Price", "Rating", "ShirtType", "UpdatedOn", "VinylType" },
                values: new object[,]
                {
                    { 1, 0, new DateTime(2026, 1, 3, 2, 35, 44, 558, DateTimeKind.Utc).AddTicks(8719), true, 1.5m, null, false, "Smooth process.", 19.99m, 5, "Cotton Tee", new DateTime(2026, 1, 3, 2, 35, 44, 558, DateTimeKind.Utc).AddTicks(8720), "Heat Transfer" },
                    { 2, 1, new DateTime(2026, 1, 3, 2, 35, 44, 558, DateTimeKind.Utc).AddTicks(8727), false, 2.0m, null, true, "Got stuck with layering.", 35.50m, 4, "Hoodie", new DateTime(2026, 1, 3, 2, 35, 44, 558, DateTimeKind.Utc).AddTicks(8728), "Glitter" },
                    { 3, 0, new DateTime(2026, 1, 3, 2, 35, 44, 558, DateTimeKind.Utc).AddTicks(8731), true, 1.0m, null, false, "Fastest one yet.", 15.00m, 5, "Tank Top", new DateTime(2026, 1, 3, 2, 35, 44, 558, DateTimeKind.Utc).AddTicks(8731), "Matte" },
                    { 4, 2, new DateTime(2026, 1, 3, 2, 35, 44, 558, DateTimeKind.Utc).AddTicks(8734), false, 2.5m, null, true, "Cool effect but tricky alignment.", 28.75m, 3, "Long Sleeve", new DateTime(2026, 1, 3, 2, 35, 44, 558, DateTimeKind.Utc).AddTicks(8735), "Holographic" },
                    { 5, 0, new DateTime(2026, 1, 3, 2, 35, 44, 558, DateTimeKind.Utc).AddTicks(8737), true, 1.75m, null, false, "Loved how it turned out.", 24.00m, 4, "Raglan", new DateTime(2026, 1, 3, 2, 35, 44, 558, DateTimeKind.Utc).AddTicks(8738), "Foil" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderForms");
        }
    }
}
