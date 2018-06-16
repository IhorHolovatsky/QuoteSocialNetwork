using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QSN.Model
{
    public class GroupModel
    {
        public string GroupId { get; set; }
        public string Name { get; set; }
        public List<string> Quotes { get; set; }
        public List<string> UserLogins { get; set; }
    }
}
