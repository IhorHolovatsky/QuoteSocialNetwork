using System.Collections.Generic;

namespace QSN.Model
{
    public partial class User
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