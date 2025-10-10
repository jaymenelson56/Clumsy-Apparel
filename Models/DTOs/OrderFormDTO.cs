using System.ComponentModel.DataAnnotations;

namespace clumsyapparel.Models.DTOs;

public class OrderFormDTO
{
    public int Id { get; set; }
    public required string VinylType { get; set; }
    public required string ShirtType { get; set; }
    public decimal Price { get; set; }
    public decimal HoursLogged { get; set; }
    public int AmountOfErrors { get; set; }
    public bool NeededHelp { get; set; }
    public int Rating { get; set; }
    public string? Notes { get; set; }
    public string? ImageURL { get; set; }
    public bool Fulfilled { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime? UpdatedOn { get; set; }
}