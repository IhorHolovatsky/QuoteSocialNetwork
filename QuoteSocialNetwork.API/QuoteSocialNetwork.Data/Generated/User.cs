using System.Collections.Generic;

namespace QuoteSocialNetwork.Data.Generated
{
    public partial class User : BaseEntity
    {
        public User()
        {
        }

        public string Id { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string PhotoUrl { get; set; }

        public virtual ICollection<UserGroup> UserGroups { get; set; } = new HashSet<UserGroup>();
    }
}