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
        [FromQuery] int pageSize = 10
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

        query = query.OrderBy(o => o.Id);

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
                Fulfilled = o.Fulfilled

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
}