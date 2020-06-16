using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BugsAway.API.Data.Models;
using Microsoft.AspNetCore.Cors;

namespace BugsAway.API.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly BugsAwayDBContext _context;

        public TicketsController(BugsAwayDBContext context)
        {
            _context = context;
        }

        // GET: api/Tickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTicket()
        {
            var tickets = await _context.Ticket.ToListAsync();

            var result = tickets.Select(t => new Ticket
            {
                TicketId = t.TicketId,
                IssueId = t.IssueId,
                EmployeeId = t.EmployeeId,
                PriorityId = t.PriorityId,
                StatusId = t.StatusId,
                Employee = _context.Employee.Find(t.EmployeeId),
                Issue = _context.Issue.Find(t.IssueId),
                Priority = _context.Priority.Find(t.PriorityId),
                Status = _context.Status.Find(t.StatusId)
                

            });


            return result.ToList();
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await _context.Ticket.FindAsync(id);

            if (ticket == null)
            {
                return NotFound();
            }

            return ticket;
        }

        // PUT: api/Tickets/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}/{userId}")]
        public async Task<IActionResult> PutTicket(int id, int userId, Ticket ticket)
        {
            if (id != ticket.TicketId)
            {
                return BadRequest();
            }

            _context.Entry(ticket).State = EntityState.Modified;

            _context.History.Add(new History
            {
                Date = DateTime.Now,
                TicketId = ticket.TicketId,
                StatusId = ticket.StatusId,
                ModifiedBy = userId
            });


            try
            {
                await _context.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tickets
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("{userId}")]
        public async Task<ActionResult<Ticket>> PostTicket(int userId, Ticket ticket)
        {

            _context.Ticket.Add(ticket);

            await _context.SaveChangesAsync();

            _context.History.Add(new History
            {
                Date = DateTime.Now,
                TicketId = ticket.TicketId,
                StatusId = ticket.StatusId,
                ModifiedBy = userId
            });

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }


            return CreatedAtAction("GetTicket", new { id = ticket.TicketId }, ticket);
        }

        // DELETE: api/Tickets/5s
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ticket>> DeleteTicket(int id)
        {
            var ticket = await _context.Ticket.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.Ticket.Remove(ticket);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }

            return ticket;
        }

        private bool TicketExists(int id)
        {
            return _context.Ticket.Any(e => e.TicketId == id);
        }
    }
}
