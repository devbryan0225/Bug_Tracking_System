using System;
using System.Collections.Generic;

namespace BugsAway.API.Data.Models
{
    public partial class Issue
    {
        public Issue()
        {
            Ticket = new HashSet<Ticket>();
        }

        public int IssueId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int FeatureId { get; set; }

        public virtual Feature Feature { get; set; }
        public virtual ICollection<Ticket> Ticket { get; set; }
    }
}
