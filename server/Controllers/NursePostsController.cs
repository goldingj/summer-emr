using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NursePostsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public NursePostsController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetNursePosts()
        {
            var posts = _context.NursesPosts.ToList();
            return Ok(posts);
        }

        [HttpPost]
        public IActionResult CreateNursePost(NursesPosts newPost)
        {
            newPost.CreatedAt = DateTime.UtcNow;
            _context.NursesPosts.Add(newPost);
            _context.SaveChanges();
            return Ok(newPost);
        }
    }
}