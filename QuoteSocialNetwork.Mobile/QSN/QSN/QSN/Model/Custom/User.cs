using System.Collections.Generic;
using System.Linq;
using QSN.Model;

namespace QSN.Model
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