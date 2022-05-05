using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
 
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly StoreContext StoreContext;

    public ProductsController(StoreContext context)
    {
        StoreContext = context;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Product>))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        var products = GetProductsOrFail();

        return await products.ToListAsync();
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Product))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Product>> GetProducts(int id)
    {
        var products = GetProductsOrFail();

        var result = await products.FirstOrDefaultAsync(p => p.Id == id);

        return result == null
            ? NotFound()
            : Ok(result);
    }

    private DbSet<Product> GetProductsOrFail()
    {
        return StoreContext.Products
            ?? throw new InvalidOperationException(
                $"{nameof(StoreContext)}.{nameof(StoreContext.Products)} is null");
    }
}
