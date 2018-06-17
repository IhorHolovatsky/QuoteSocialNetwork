using System.Collections.Generic;
using System.Linq;

namespace QSN.Model
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