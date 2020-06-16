using System;
using System.Collections.Generic;

namespace BugsAway.API.Data.Models
{
    public partial class History
    {
        public int HistoryId { get; set; }
        public DateTime Date { get; set; }
        public int TicketId { get; set; }
        public int StatusId { get; set; }
        public int ModifiedBy { get; set; }
    }
}
