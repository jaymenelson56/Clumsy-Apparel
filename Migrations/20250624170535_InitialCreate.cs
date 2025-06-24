using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

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
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    VinylType = table.Column<string>(type: "text", nullable: false),
                    ShirtType = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    HoursLogged = table.Column<decimal>(type: "numeric", nullable: false),
                    AmountOfErrors = table.Column<int>(type: "integer", nullable: false),
                    NeededHelp = table.Column<bool>(type: "boolean", nullable: false),
                    Rating = table.Column<int>(type: "integer", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    ImageURL = table.Column<string>(type: "text", nullable: true),
                    Fulfilled = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
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
                    { 1, 0, new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3058), true, 1.5m, null, false, "Smooth process.", 19.99m, 5, "Cotton Tee", new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3060), "Heat Transfer" },
                    { 2, 1, new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3063), false, 2.0m, null, true, "Got stuck with layering.", 35.50m, 4, "Hoodie", new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3064), "Glitter" },
                    { 3, 0, new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3067), true, 1.0m, null, false, "Fastest one yet.", 15.00m, 5, "Tank Top", new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3067), "Matte" },
                    { 4, 2, new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3071), false, 2.5m, null, true, "Cool effect but tricky alignment.", 28.75m, 3, "Long Sleeve", new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3072), "Holographic" },
                    { 5, 0, new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3074), true, 1.75m, null, false, "Loved how it turned out.", 24.00m, 4, "Raglan", new DateTime(2025, 6, 24, 17, 5, 35, 718, DateTimeKind.Utc).AddTicks(3075), "Foil" }
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
