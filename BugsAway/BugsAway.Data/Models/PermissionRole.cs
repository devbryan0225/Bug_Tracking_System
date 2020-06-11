using System;
using System.Collections.Generic;

namespace BugsAway.API.Data.Models
{
    public partial class PermissionRole
    {
        public int PermRoleId { get; set; }
        public int RoleId { get; set; }
        public int PermissionId { get; set; }

        public virtual Permission Permission { get; set; }
        public virtual Role Role { get; set; }
    }
}
