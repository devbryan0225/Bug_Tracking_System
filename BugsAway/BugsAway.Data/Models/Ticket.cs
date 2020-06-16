using System;
using System.Collections.Generic;

namespace BugsAway.API.Data.Models
{
    public partial class Ticket
    {
        public int TicketId { get; set; }
        public int IssueId { get; set; }
        public int EmployeeId { get; set; }
        public int PriorityId { get; set; }
        public int StatusId { get; set; }
        public int CreatedBy { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual Issue Issue { get; set; }
        public virtual Priority Priority { get; set; }
        public virtual Status Status { get; set; }
    }
}
