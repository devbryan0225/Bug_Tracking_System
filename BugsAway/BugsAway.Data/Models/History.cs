using System;
using System.Collections.Generic;

namespace BugsAway.API.Data.Models
{
    public partial class History
    {
        public int HistoryId { get; set; }
        public DateTime Date { get; set; }
        public int TaskId { get; set; }
        public int StatusId { get; set; }
        public int EmployeeId { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual Status Status { get; set; }
        public virtual Ticket Task { get; set; }
    }
}
