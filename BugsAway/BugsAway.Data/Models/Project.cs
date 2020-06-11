using System;
using System.Collections.Generic;

namespace BugsAway.API.Data.Models
{
    public partial class Project
    {
        public Project()
        {
            Feature = new HashSet<Feature>();
        }

        public int ProjectId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Feature> Feature { get; set; }
    }
}
