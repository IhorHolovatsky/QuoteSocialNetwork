using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QSN.Model
{
    public class QuoteModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string AuthorName { get; set; }
        public string Location { get; set; }
        public DateTime Date { get; set; }
        public string ImageSource { get; set; }
        public GroupModel Group{ get; set; }
    }
}
