namespace API.Entities;

public class Basket
{
    public int Id { get; set; }

    public string BuyerId { get; set; } = string.Empty;

    public List<BasketItem> Items { get; set; } = new();

    public void AddItem(Product product, int quantity)
    {
        var basketItem = Items.FirstOrDefault(bi => bi.ProductId == product.Id);

        if (basketItem == null)
        {
            basketItem = new BasketItem
            {
                ProductId = product.Id,
                Product = product,
                Quantity = 0
            };
            Items.Add(basketItem);
        }

        basketItem.Quantity += quantity;
    }

    public void RemoveItem(int productId, int quantity)
    {
        var basketItem = Items.FirstOrDefault(bi => bi.ProductId == productId);

        if (basketItem == null)
        {
            return;
        }

        basketItem.Quantity -= quantity;

        if (basketItem.Quantity <= 0)
        {
            if (Items.Remove(basketItem) == false)
            {
                throw new InvalidOperationException("Unable to remove item from list");
            }
        }
    }
}
