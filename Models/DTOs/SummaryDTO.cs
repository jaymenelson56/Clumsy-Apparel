namespace clumsyapparel.Models.DTOs;
public class SummaryDTO
{
    public decimal TotalHours { get; set; }
    public double AverageRating { get; set; }
    public decimal FulfilledRevenue { get; set; }
    public DateTime? FirstProjectCreated { get; set; }
    public DateTime? MostRecentActivity { get; set; }
    public int TotalOrders { get; set; }
    public int FulfilledOrders { get; set; }
    public int UnfulfilledOrders { get; set; }
}