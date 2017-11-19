using System.Collections.Generic;
using System.Linq;

namespace QuoteSocialNetwork.Data.Generated
{
    public partial class Group
    {
        public List<User> Users
        {
            get
            {
                return UserGroups.Select(ug => ug.User).ToList();
            }
        }
    }
}