using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mission11.API.Data;
using mission11.API.Models;
using Microsoft.EntityFrameworkCore;


namespace mission11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntertainerController : ControllerBase
    {
        private readonly AgencyContext _context;

        public EntertainerController(AgencyContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetEntertainers(
    int pageHowMany = 10,
    int pageNum = 1,
    string sortBy = "EntStageName",
    string sortOrder = "asc",
    [FromQuery] List<string>? projectTypes = null)
        {
            var query = _context.Entertainers
                .Include(e => e.Engagements)
                .AsQueryable();

            // Filter by city (from projectTypes)
            if (projectTypes != null && projectTypes.Any())
            {
                query = query.Where(e => projectTypes.Contains(e.EntCity));
            }

            var totalNumEntertainers = query.Count();

            // Sort
            if (sortBy.ToLower() == "entstagename")
            {
                query = sortOrder == "desc"
                    ? query.OrderByDescending(e => e.EntStageName)
                    : query.OrderBy(e => e.EntStageName);
            }

            var paged = query
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            // Populate computed properties
            foreach (var entertainer in paged)
            {
                entertainer.BookingCount = entertainer.Engagements?.Count ?? 0;

                var lastBooking = entertainer.Engagements?
                    .OrderByDescending(e => e.StartDate)
                    .FirstOrDefault()?.StartDate;

                entertainer.LastBookingDate = lastBooking;
            }

            return Ok(new
            {
                Entertainers = paged,
                TotalNumEntertainers = totalNumEntertainers
            });
        }


        [HttpGet("GetCities")]
        public IActionResult GetCities()
        {
            var cities = _context.Entertainers
                .Select(e => e.EntCity)
                .Distinct()
                .ToList();

            return Ok(cities);
        }

        [HttpPost("AddEntertainer")]
        public IActionResult AddEntertainer([FromBody] Entertainer newEntertainer)
        {
            _context.Entertainers.Add(newEntertainer);
            _context.SaveChanges();
            return Ok(newEntertainer);
        }

        [HttpPut("UpdateEntertainer/{entertainerId}")]
        public IActionResult UpdateEntertainer(int entertainerId, [FromBody] Entertainer updatedEntertainer)
        {
            var existingEntertainer = _context.Entertainers.Find(entertainerId);

            if (existingEntertainer == null)
            {
                return NotFound(new { message = "Entertainer not found" });
            }

            existingEntertainer.EntStageName = updatedEntertainer.EntStageName;
            existingEntertainer.EntSSN = updatedEntertainer.EntSSN;
            existingEntertainer.EntStreetAddress = updatedEntertainer.EntStreetAddress;
            existingEntertainer.EntCity = updatedEntertainer.EntCity;
            existingEntertainer.EntState = updatedEntertainer.EntState;
            existingEntertainer.EntZipCode = updatedEntertainer.EntZipCode;
            existingEntertainer.EntPhoneNumber = updatedEntertainer.EntPhoneNumber;
            existingEntertainer.EntEmailAddress = updatedEntertainer.EntEmailAddress;
            existingEntertainer.EntWebPage = updatedEntertainer.EntWebPage;
            existingEntertainer.DateEntered = updatedEntertainer.DateEntered;

            _context.Entertainers.Update(existingEntertainer);
            _context.SaveChanges();

            return Ok(existingEntertainer);
        }

        [HttpDelete("DeleteEntertainer/{entertainerId}")]
        public IActionResult DeleteEntertainer(int entertainerId)
        {
            var entertainer = _context.Entertainers.Find(entertainerId);

            if (entertainer == null)
            {
                return NotFound(new { message = "Entertainer not found" });
            }

            _context.Entertainers.Remove(entertainer);
            _context.SaveChanges();

            return NoContent();
        }
    }
}


