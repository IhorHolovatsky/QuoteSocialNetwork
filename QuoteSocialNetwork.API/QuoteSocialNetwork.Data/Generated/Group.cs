using System;
using System.Collections.Generic;

namespace QuoteSocialNetwork.Data.Generated
{
    public partial class Group : BaseEntity
    {
        public Group()
        {
        }

        public Guid Id { get; set; }
        
        public string Name { get; set; }

        public virtual ICollection<UserGroup> UserGroups { get; set; } = new HashSet<UserGroup>();
    }
}