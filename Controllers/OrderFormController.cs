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
        [FromQuery] int? minRating,
        [FromQuery] int? maxRating,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10
        )
    {
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

        if (minRating.HasValue)
        {
            query = query.Where(o => o.Rating >= minRating.Value);
        }
        if (maxRating.HasValue)
        {
            query = query.Where(o => o.Rating <= maxRating.Value);
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
}