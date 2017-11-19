using System.Collections.Generic;
using System.Linq;
using QuoteSocialNetwork.Data.Generated;

namespace QuoteSocialNetwork.Data.Generated
{
    public partial class User
    {
        public List<Group> Groups
        {
            get
            {
                return UserGroups.Select(ug => ug.Group).ToList();
            }
        }        
    }
}