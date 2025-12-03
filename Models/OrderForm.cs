using System.ComponentModel.DataAnnotations;

namespace clumsyapparel.Models;

public class OrderForm
{
    public int Id { get; set; }
    public required string VinylType { get; set; }
    public required string ShirtType { get; set; }
    [Range(0, double.MaxValue, ErrorMessage = "Price cannot be negative.")]
    public required decimal Price { get; set; }
    [Range(0, double.MaxValue, ErrorMessage = "Hours cannot be negative.")]
    public decimal HoursLogged { get; set; }
    [Range(0, int.MaxValue, ErrorMessage = "Errors cannot be negative.")]
    public int AmountOfErrors { get; set; }
    public bool NeededHelp { get; set; }
    [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
    public int Rating { get; set; }
    [MaxLength(500, ErrorMessage = "Notes cannot exceed 500 characters.")]
    public string? Notes { get; set; }
    public string? ImageURL { get; set; }
    public bool Fulfilled { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime? UpdatedOn { get; set; }
}