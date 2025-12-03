using System.ComponentModel.DataAnnotations;

namespace clumsyapparel.Models.DTOs;

public class CreateOrderRequest
{
    [Required]
    public string VinylType { get; set; } = string.Empty;
    
    [Required]
    public string ShirtType { get; set; } = string.Empty;
    
    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "Price cannot be negative.")]
    public decimal Price { get; set; }

    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "Hours cannot be negative.")]
    public decimal HoursLogged { get; set; }
    [Required]
    [Range(0, int.MaxValue, ErrorMessage = "Errors cannot be negative.")]
    public int AmountOfErrors { get; set; }
    [Required]
    public bool NeededHelp { get; set; }
    [Required]
    [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
    public int Rating { get; set; }
    [MaxLength(500, ErrorMessage = "Notes cannot exceed 500 characters.")]
    public string? Notes { get; set; }
    [Required]
    public bool Fulfilled { get; set; }
    public IFormFile? Image { get; set; }
    public string? ImageURL { get; set; }
}