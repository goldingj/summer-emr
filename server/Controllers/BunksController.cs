using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
namespace server.Controllers

    {
    [ApiController]
    [Route("api/[controller]")]
    public class BunksController : ControllerBase
    {
        private readonly AppDbContext _context;
        public BunksController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetBunks()
        {
            var bunks = _context.Bunks.OrderBy(b => b.BunkName).ToList();
            return Ok(bunks);
        }
    }
}