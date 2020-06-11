using System;
using System.Collections.Generic;

namespace BugsAway.API.Data.Models
{
    public partial class Role
    {
        public Role()
        {
            Employee = new HashSet<Employee>();
            PermissionRole = new HashSet<PermissionRole>();
        }

        public int RoleId { get; set; }
        public string Title { get; set; }

        public virtual ICollection<Employee> Employee { get; set; }
        public virtual ICollection<PermissionRole> PermissionRole { get; set; }
    }
}
