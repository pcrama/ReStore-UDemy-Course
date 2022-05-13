using API.Entities;

namespace API.DTOs;

public class BasketItemDto
{
    public int ProductId { get; set; }
    public string Name { get; set; } = string.Empty;
    public long Price { get; set; }
    public string PictureUrl { get; set; } = string.Empty;
    public string Brand { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public int Quantity { get; set; }

    public static BasketItemDto From(BasketItem basketItem)
    {
        return new BasketItemDto
        {
            ProductId = basketItem.Product.Id,
            Name = basketItem.Product.Name,
            Price = basketItem.Product.Price,
            PictureUrl = basketItem.Product.PictureUrl,
            Brand = basketItem.Product.Brand,
            Type = basketItem.Product.Type,
            Quantity = basketItem.Quantity
        };
    }
}
