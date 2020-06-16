using System;
using System.Collections.Generic;

namespace BugsAway.API.Data.Models
{
    public partial class Employee
    {
        public Employee()
        {
            Ticket = new HashSet<Ticket>();
        }

        public int EmployeeId { get; set; }
        public int RoleId { get; set; }
        public string Name { get; set; }

        public virtual Role Role { get; set; }
        public virtual ICollection<Ticket> Ticket { get; set; }
    }
}
