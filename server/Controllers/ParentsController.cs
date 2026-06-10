using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ParentsController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("{id}")]
        public IActionResult GetParentById(int id)
        {
            var parent = _context.Parents.Find(id);
            if (parent == null)
            {
                return NotFound();
            }
            return Ok(parent);
        }
        [HttpPost]
        public IActionResult AddParent(Parent parent)
        {
            _context.Parents.Add(parent);
            _context.SaveChanges();
            return Ok(parent);
        }
    }
}