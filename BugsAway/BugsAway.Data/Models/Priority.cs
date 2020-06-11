using System;
using System.Collections.Generic;

namespace BugsAway.API.Data.Models
{
    public partial class Priority
    {
        public Priority()
        {
            Ticket = new HashSet<Ticket>();
        }

        public int PriorityId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Ticket> Ticket { get; set; }
    }
}
