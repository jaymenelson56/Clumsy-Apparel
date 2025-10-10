namespace clumsyapparel.Models.DTOs;

public class OrderListDTO
{
    public int Id { get; set; }
    public required string VinylType { get; set; }
    public required string ShirtType { get; set; }
    public decimal Price { get; set; }
    public decimal HoursLogged { get; set; }
    public bool NeededHelp { get; set; }
    public int Rating { get; set; }
    public string? Notes { get; set; }
    public bool Fulfilled { get; set; }
    public string? ImageURL { get; set; }
}