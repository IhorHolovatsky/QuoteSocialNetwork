using System;
using System.Collections.Generic;

namespace QSN.Model
{
    public partial class Group 
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<Quote> Quotes { get; set; } = new HashSet<Quote>();

        public virtual ICollection<UserGroup> UserGroups { get; set; } = new HashSet<UserGroup>();
    }
}