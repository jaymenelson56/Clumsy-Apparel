using clumsyapparel.Data;
using clumsyapparel.Models;
using clumsyapparel.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace clumsyapparel.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderFormController(clumsyapparelDbContext context) : ControllerBase
{
    private readonly clumsyapparelDbContext _dbContext = context;

    [HttpGet]
    public async Task<IActionResult> GetList(
        [FromQuery] string? vinyl,
        [FromQuery] string? shirt,
        [FromQuery] string? notes,
        [FromQuery] bool? neededHelp,
        [FromQuery] bool? fulfilled,
        [FromQuery] decimal? minPrice,
        [FromQuery] decimal? maxPrice,
        [FromQuery] decimal? minHours,
        [FromQuery] decimal? maxHours,
        [FromQuery] int? rating,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 9
        )
    {
        if (page < 1)
        {
            return BadRequest("Page number must be at least 1.");
        }

        if (rating.HasValue && (rating < 1 || rating > 5))
        {
            return BadRequest("Rating must be between 1 and 5.");
        }

        if (minPrice.HasValue && maxPrice.HasValue && minPrice > maxPrice)
        {
            return BadRequest("Minimum price cannot be greater than maximum price.");
        }

        if (minHours.HasValue && maxHours.HasValue && minHours > maxHours)
        {
            return BadRequest("Minimum hours cannot be greater than maximum hours.");
        }
        vinyl = vinyl?.Trim();
        shirt = shirt?.Trim();
        notes = notes?.Trim();


        IQueryable<OrderForm> query = _dbContext.OrderForms;

        if (!string.IsNullOrEmpty(vinyl))
        {
            query = query.Where(o => o.VinylType.ToLower().Contains(vinyl.ToLower()));
        }
        if (!string.IsNullOrEmpty(shirt))
        {
            query = query.Where(o => o.ShirtType.ToLower().Contains(shirt.ToLower()));
        }
        if (!string.IsNullOrEmpty(notes))
        {
            query = query.Where(o => o.Notes != null && o.Notes.ToLower().Contains(notes.ToLower()));
        }

        if (neededHelp.HasValue)
        {
            query = query.Where(o => o.NeededHelp == neededHelp.Value);
        }
        if (fulfilled.HasValue)
        {
            query = query.Where(o => o.Fulfilled == fulfilled.Value);
        }

        if (minPrice.HasValue)
        {
            query = query.Where(o => o.Price >= minPrice.Value);
        }
        if (maxPrice.HasValue)
        {
            query = query.Where(o => o.Price <= maxPrice.Value);
        }

        if (minHours.HasValue)
        {
            query = query.Where(o => o.HoursLogged >= minHours.Value);
        }
        if (maxHours.HasValue)
        {
            query = query.Where(o => o.HoursLogged <= maxHours.Value);
        }

        if (rating.HasValue)
        {
            query = query.Where(o => o.Rating == rating.Value);
        }

        query = query.OrderByDescending(o => o.CreatedOn);

        int totalCount = await query.CountAsync();

        query = query.Skip((page - 1) * pageSize).Take(pageSize);


        List<OrderListDTO> orders = await query
            .Select(o => new OrderListDTO
            {
                Id = o.Id,
                VinylType = o.VinylType,
                ShirtType = o.ShirtType,
                Price = o.Price,
                HoursLogged = o.HoursLogged,
                NeededHelp = o.NeededHelp,
                Rating = o.Rating,
                Notes = o.Notes,
                ImageURL = o.ImageURL,
                Fulfilled = o.Fulfilled,
                CreatedOn = o.CreatedOn

            })
            .ToListAsync();

        PageResult<OrderListDTO> result = new PageResult<OrderListDTO>
        {
            Data = orders,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            OrderForm? order = await _dbContext.OrderForms.FindAsync(id);

            if (order == null)
            {
                return NotFound(new { Message = $"Order with ID {id} not found." });
            }

            OrderFormDTO orderDto = new()
            {
                Id = order.Id,
                VinylType = order.VinylType,
                ShirtType = order.ShirtType,
                Price = order.Price,
                HoursLogged = order.HoursLogged,
                AmountOfErrors = order.AmountOfErrors,
                NeededHelp = order.NeededHelp,
                Rating = order.Rating,
                Notes = order.Notes,
                ImageURL = order.ImageURL,
                Fulfilled = order.Fulfilled,
                CreatedOn = order.CreatedOn,
                UpdatedOn = order.UpdatedOn
            };

            return Ok(orderDto);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error retrieving order with ID {id}: {ex.Message}");
            return StatusCode(500, new { Message = "An unexpected error occurred while retrieving the order." });
        }
    }
    [HttpPost]
    public async Task<IActionResult> CreateOrderForm([FromForm] CreateOrderRequest request)
    {
        try
        {
            if (request.Rating < 1 || request.Rating > 5)
            {
                return BadRequest("Rating must be between 1 and 5.");
            }

            OrderForm newOrder = new OrderForm
            {
                VinylType = request.VinylType.Trim(),
                ShirtType = request.ShirtType.Trim(),
                Price = request.Price,
                HoursLogged = request.HoursLogged,
                AmountOfErrors = request.AmountOfErrors,
                NeededHelp = request.NeededHelp,
                Rating = request.Rating,
                Notes = string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes.Trim(),
                Fulfilled = request.Fulfilled,
                CreatedOn = DateTime.UtcNow,
                UpdatedOn = null
            };

            if (request.Image != null && request.Image.Length > 0)
            {
                string uploadsFolder = Path.Combine(AppContext.BaseDirectory, "wwwroot", "uploads");
                Directory.CreateDirectory(uploadsFolder);

                string fileName = Path.GetFileName(request.Image.FileName)
                    .Replace(" ", "_")
                    .Replace(",", "");

                string filePath = Path.Combine(uploadsFolder, fileName);

                using FileStream stream = new FileStream(filePath, FileMode.Create);
                await request.Image.CopyToAsync(stream);

                newOrder.ImageURL = $"/uploads/{fileName}";
            }
            else if (!string.IsNullOrEmpty(request.ImageURL))
            {
                newOrder.ImageURL = request.ImageURL;
            }

            _dbContext.OrderForms.Add(newOrder);
            await _dbContext.SaveChangesAsync();

            OrderFormDTO createdDto = new OrderFormDTO
            {
                Id = newOrder.Id,
                VinylType = newOrder.VinylType,
                ShirtType = newOrder.ShirtType,
                Price = newOrder.Price,
                HoursLogged = newOrder.HoursLogged,
                AmountOfErrors = newOrder.AmountOfErrors,
                NeededHelp = newOrder.NeededHelp,
                Rating = newOrder.Rating,
                Notes = newOrder.Notes,
                ImageURL = newOrder.ImageURL,
                Fulfilled = newOrder.Fulfilled,
                CreatedOn = newOrder.CreatedOn,
                UpdatedOn = newOrder.UpdatedOn
            };

            return CreatedAtAction(nameof(GetById), new { id = newOrder.Id }, createdDto);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error creating order: {ex.Message}");
            return StatusCode(500, new { Message = "An unexpected error occurred while creating the order." });
        }
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateOrderForm(int id, [FromForm] UpdateOrderRequest request)
    {
        OrderForm? existingOrder = await _dbContext.OrderForms.FindAsync(id);

        if (existingOrder == null)
        {
            return NotFound(new { Message = $"Order with ID {id} not found." });
        }

        if (!string.IsNullOrWhiteSpace(request.VinylType))
        {
            existingOrder.VinylType = request.VinylType.Trim();
        }

        if (!string.IsNullOrWhiteSpace(request.ShirtType))
        {
            existingOrder.ShirtType = request.ShirtType.Trim();
        }

        if (request.Price.HasValue)
        {
            existingOrder.Price = request.Price.Value;
        }

        if (request.HoursLogged.HasValue)
        {
            existingOrder.HoursLogged = request.HoursLogged.Value;
        }

        if (request.AmountOfErrors.HasValue)
        {
            existingOrder.AmountOfErrors = request.AmountOfErrors.Value;
        }

        if (request.NeededHelp.HasValue)
        {
            existingOrder.NeededHelp = request.NeededHelp.Value;
        }

        if (request.Rating.HasValue)
        {
            existingOrder.Rating = request.Rating.Value;
        }

        if (!string.IsNullOrWhiteSpace(request.Notes))
        {
            existingOrder.Notes = request.Notes.Trim();
        }

        if (request.Fulfilled.HasValue)
        {
            existingOrder.Fulfilled = request.Fulfilled.Value;
        }

        if (request.Image != null && request.Image.Length > 0)
        {
            string uploadsFolder = Path.Combine(AppContext.BaseDirectory, "wwwroot", "uploads");
            Directory.CreateDirectory(uploadsFolder);

            string fileName = Path.GetFileName(request.Image.FileName)
                .Replace(" ", "_")
                .Replace(",", "");

            string filePath = Path.Combine(uploadsFolder, fileName);

            using FileStream stream = new FileStream(filePath, FileMode.Create);
            await request.Image.CopyToAsync(stream);

            existingOrder.ImageURL = $"/uploads/{fileName}";
        }
        else if (!string.IsNullOrEmpty(request.ImageURL))
        {
            existingOrder.ImageURL = request.ImageURL;
        }

        existingOrder.UpdatedOn = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();

        return Ok(new { Message = "Order updated successfully.", UpdatedOn = existingOrder.UpdatedOn });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrderForm(int id)
    {
        try
        {
            // Look up the order
            OrderForm? order = await _dbContext.OrderForms.FindAsync(id);

            if (order == null)
            {
                return NotFound(new { Message = $"Order with ID {id} not found." });
            }

            // Optionally delete the uploaded image from disk if it exists
            if (!string.IsNullOrEmpty(order.ImageURL))
            {
                string appDataRoot = Environment.GetFolderPath(
    Environment.SpecialFolder.ApplicationData
);

                string imagePath = Path.Combine(
                    AppContext.BaseDirectory,
                    "wwwroot",
                     "uploads",
                    Path.GetFileName(order.ImageURL)
                );

                if (System.IO.File.Exists(imagePath))
                {
                    System.IO.File.Delete(imagePath);
                }
            }

            _dbContext.OrderForms.Remove(order);
            await _dbContext.SaveChangesAsync();

            return Ok(new { Message = $"Order with ID {id} deleted successfully." });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting order {id}: {ex.Message}");
            return StatusCode(500, new { Message = "An unexpected error occurred while deleting the order." });
        }
    }
    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        List<OrderForm> orders = await _dbContext.OrderForms.ToListAsync(); // Load to memory first

        if (orders.Count == 0)
        {
            return Ok(new SummaryDTO());
        }

        SummaryDTO summary = new SummaryDTO
        {
            TotalHours = orders.Sum((OrderForm o) => o.HoursLogged),
            AverageRating = orders.Average((OrderForm o) => (double)o.Rating),
            FulfilledRevenue = orders.Where((OrderForm o) => o.Fulfilled)
                                     .Sum((OrderForm o) => o.Price),
            FirstProjectCreated = orders.Min((OrderForm o) => (DateTime?)o.CreatedOn),
            MostRecentActivity = orders.Max((OrderForm o) => o.UpdatedOn ?? o.CreatedOn),
            TotalOrders = orders.Count,
            FulfilledOrders = orders.Count((OrderForm o) => o.Fulfilled),
            UnfulfilledOrders = orders.Count((OrderForm o) => !o.Fulfilled)
        };

        return Ok(summary);
    }
}
