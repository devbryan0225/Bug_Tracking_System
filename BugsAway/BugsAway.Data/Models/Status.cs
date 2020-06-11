using System;
using System.Collections.Generic;

namespace BugsAway.API.Data.Models
{
    public partial class Status
    {
        public Status()
        {
            History = new HashSet<History>();
            Ticket = new HashSet<Ticket>();
        }

        public int StatusId { get; set; }
        public string Title { get; set; }

        public virtual ICollection<History> History { get; set; }
        public virtual ICollection<Ticket> Ticket { get; set; }
    }
}
