using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController : BaseApiController
{
    private const string BuyerIdKey = "buyerId";

    private readonly StoreContext _context;

    public BasketController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var (baskets, _) = CheckContext();
        Basket? basket = await GetBasketAsync(baskets);

        return basket == null
            ? NotFound()
            : Ok(BasketDto.From(basket));
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
    {
        var (baskets, products) = CheckContext();
        var basket = await GetBasketAsync(baskets);
        if (basket == null)
        {
            basket = CreateBasket(baskets);
        }

        var product = await products.FindAsync(productId);
        if (product == null)
        {
            return NotFound();
        }

        basket.AddItem(product, quantity);
        var dataWritten = await _context.SaveChangesAsync() > 0;
        if (dataWritten)
        {
            return CreatedAtRoute("GetBasket", BasketDto.From(basket));
        }

        return BadRequest(new ProblemDetails
        {
            Title = "Problem saving item to basket."
        });
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        var (baskets, _) = CheckContext();
        var basket = await GetBasketAsync(baskets);
        if (basket == null)
        {
            return NotFound();
        }

        basket.RemoveItem(productId, quantity);
        var dataWritten = await _context.SaveChangesAsync() > 0;
        if (dataWritten)
        {
            return Ok();
        }

        return BadRequest(new ProblemDetails
        {
            Title = "Problem removing item from basket."
        });
    }

    private async Task<Basket?> GetBasketAsync(DbSet<Basket> baskets)
    {
        var buyerId = BuyerId();
        if (buyerId == null)
        {
            return null;
        }

        var basketQuery = baskets
                    .Where(x => x.BuyerId == buyerId)
                    .Include(i => i.Items)
                    .ThenInclude(p => p.Product);
        if (basketQuery == null)
        {
            throw new InvalidOperationException("basketQuery may not be null");
        }

        var basket = await basketQuery.FirstOrDefaultAsync();

        return basket;
    }

    private Basket CreateBasket(DbSet<Basket> baskets)
    {
        var buyerId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.Now.AddDays(30)
        };
        Response.Cookies.Append(BuyerIdKey, buyerId, cookieOptions);
        var basket = new Basket { BuyerId = buyerId };
        baskets.Add(basket);
        return basket;
    }

    private string? BuyerId() => Request.Cookies[BuyerIdKey];

    private (DbSet<Basket>, DbSet<Product>) CheckContext()
    {
        return (
            _context.Baskets ?? throw new InvalidOperationException("no Baskets in context"),
            _context.Products ?? throw new InvalidOperationException("no Product in context")
        );
    }
}
