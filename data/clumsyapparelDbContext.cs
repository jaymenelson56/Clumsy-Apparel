using Microsoft.EntityFrameworkCore;
using clumsyapparel.Models;

namespace clumsyapparel.Data;

public class clumsyapparelDbContext : DbContext
{
    public clumsyapparelDbContext(DbContextOptions<clumsyapparelDbContext> options)
        : base(options)
    {
    }

    public DbSet<OrderForm> OrderForms { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<OrderForm>().HasData(
            new OrderForm
            {
                Id = 1,
                VinylType = "Heat Transfer",
                ShirtType = "Cotton Tee",
                Price = 19.99m,
                HoursLogged = 1.5m,
                AmountOfErrors = 0,
                NeededHelp = false,
                Rating = 5,
                Notes = "Smooth process.",
                ImageURL = null,
                Fulfilled = true,
                CreatedOn = DateTime.UtcNow,
                UpdatedOn = DateTime.UtcNow
            },
            new OrderForm
            {
                Id = 2,
                VinylType = "Glitter",
                ShirtType = "Hoodie",
                Price = 35.50m,
                HoursLogged = 2.0m,
                AmountOfErrors = 1,
                NeededHelp = true,
                Rating = 4,
                Notes = "Got stuck with layering.",
                ImageURL = null,
                Fulfilled = false,
                CreatedOn = DateTime.UtcNow,
                UpdatedOn = DateTime.UtcNow
            },
            new OrderForm
            {
                Id = 3,
                VinylType = "Matte",
                ShirtType = "Tank Top",
                Price = 15.00m,
                HoursLogged = 1.0m,
                AmountOfErrors = 0,
                NeededHelp = false,
                Rating = 5,
                Notes = "Fastest one yet.",
                ImageURL = null,
                Fulfilled = true,
                CreatedOn = DateTime.UtcNow,
                UpdatedOn = DateTime.UtcNow
            },
            new OrderForm
            {
                Id = 4,
                VinylType = "Holographic",
                ShirtType = "Long Sleeve",
                Price = 28.75m,
                HoursLogged = 2.5m,
                AmountOfErrors = 2,
                NeededHelp = true,
                Rating = 3,
                Notes = "Cool effect but tricky alignment.",
                ImageURL = null,
                Fulfilled = false,
                CreatedOn = DateTime.UtcNow,
                UpdatedOn = DateTime.UtcNow
            },
            new OrderForm
            {
                Id = 5,
                VinylType = "Foil",
                ShirtType = "Raglan",
                Price = 24.00m,
                HoursLogged = 1.75m,
                AmountOfErrors = 0,
                NeededHelp = false,
                Rating = 4,
                Notes = "Loved how it turned out.",
                ImageURL = null,
                Fulfilled = true,
                CreatedOn = DateTime.UtcNow,
                UpdatedOn = DateTime.UtcNow
            }
        );
    }
}