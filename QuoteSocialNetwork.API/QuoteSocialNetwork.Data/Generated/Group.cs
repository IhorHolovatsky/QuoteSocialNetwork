using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuoteSocialNetwork.Data.Generated
{
    public partial class Group : BaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<Quote> Quotes { get; set; } = new HashSet<Quote>();

        public virtual ICollection<UserGroup> UserGroups { get; set; } = new HashSet<UserGroup>();
    }
}