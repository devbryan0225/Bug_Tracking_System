using System;
using System.Collections.Generic;

namespace BugsAway.API.Data.Models
{
    public partial class Permission
    {
        public Permission()
        {
            PermissionRole = new HashSet<PermissionRole>();
        }

        public int PermissionId { get; set; }
        public string Action { get; set; }

        public virtual ICollection<PermissionRole> PermissionRole { get; set; }
    }
}
