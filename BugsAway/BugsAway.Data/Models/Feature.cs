using System;
using System.Collections.Generic;

namespace BugsAway.API.Data.Models
{
    public partial class Feature
    {
        public Feature()
        {
            Issue = new HashSet<Issue>();
        }

        public int FeatureId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int ProjectId { get; set; }

        public virtual Project Project { get; set; }
        public virtual ICollection<Issue> Issue { get; set; }
    }
}
