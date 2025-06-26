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
public class ClumsyapparelController : ControllerBase
{
    private readonly clumsyapparelDbContext _dbContext;

    public ClumsyapparelController(clumsyapparelDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetList(
        [FromQuery] string? vinyl,
        [FromQuery] string? shirt,
        [FromQuery] string? notes,
        [FromQuery] bool? neededHelp,
        [FromQuery] bool? fulfilled,
        [FromQuery] string? sortBy,
        [FromQuery] string? sortDirection // "asc" or "desc"
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

        bool descending = sortDirection?.ToLower() == "desc";
        if (!string.IsNullOrEmpty(sortBy))
        {
            switch (sortBy.ToLower())
            {
                case "price":
                    query = descending ? query.OrderByDescending(o => o.Price) : query.OrderBy(o => o.Price);
                    break;
                case "hourslogged":
                    query = descending ? query.OrderByDescending(o => o.HoursLogged) : query.OrderBy(o => o.HoursLogged);
                    break;
                case "rating":
                    query = descending ? query.OrderByDescending(o => o.Rating) : query.OrderBy(o => o.Rating);
                    break;
            }
        }


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

        return Ok(orders);
    }
}