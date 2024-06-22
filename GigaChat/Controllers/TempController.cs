using Microsoft.AspNetCore.Mvc;

namespace GigaChat.Controllers;

[ApiController]
[Route("[controller]")]
public class TempController : ControllerBase
{
    private readonly ILogger<TempController> _logger;

    public TempController(ILogger<TempController> logger)
    {
        _logger = logger;
    }

    // [HttpGet("tempGet")]
    // public IEnumerable<TempController> Get()
    // {
        
    // }
}
