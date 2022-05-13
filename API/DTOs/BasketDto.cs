using API.Entities;

namespace API.DTOs;

public class BasketDto
{
    public int Id { get; set; }

    public string BuyerId { get; set; } = string.Empty;

    public List<BasketItemDto> Items { get; set; } = new();

    public static BasketDto From(Basket basket)
    {
        return new BasketDto
        {
            Id = basket.Id,
            BuyerId = basket.BuyerId,
            Items = basket.Items.Select(BasketItemDto.From).ToList()
        };
    }
}
