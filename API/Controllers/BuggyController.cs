using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController : BaseApiController
{
    [HttpGet("not-found")]
    public ActionResult GetNotFound() => NotFound();

    [HttpGet("bad-request")]
    public ActionResult GetBadRequest() => BadRequest(
        new ProblemDetails
        {
            Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
            Title = "this is a bad request",
            Detail = "Detailed error message."
        });

    [HttpGet("unauthorised")]
    public ActionResult GetUnauthorised() => Unauthorized();

    [HttpGet("validation-error")]
    public ActionResult GetValidationError()
    {
        ModelState.AddModelError("Problem1", "This is the first problem");
        ModelState.AddModelError("Problem2", "This is the second problem");
        return ValidationProblem();
    }

    [HttpGet("server-error")]
    public ActionResult GetServerError() => throw new Exception("Server error!");
}
