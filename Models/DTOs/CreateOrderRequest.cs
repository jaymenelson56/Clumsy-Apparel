using System.ComponentModel.DataAnnotations;

namespace clumsyapparel.Models.DTOs;

public class CreateOrderRequest
{
    [Required]
    public string VinylType { get; set; } = string.Empty;
    
    [Required]
    public string ShirtType { get; set; } = string.Empty;
    
    [Required]
    public decimal Price { get; set; }
    
    public decimal HoursLogged { get; set; }
    public int AmountOfErrors { get; set; }
    public bool NeededHelp { get; set; }
    
    [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
    public int Rating { get; set; }
    
    [MaxLength(500, ErrorMessage = "Notes cannot exceed 500 characters.")]
    public string? Notes { get; set; }
    
    public bool Fulfilled { get; set; }
    public IFormFile? Image { get; set; }
    public string? ImageUrl { get; set; }
}