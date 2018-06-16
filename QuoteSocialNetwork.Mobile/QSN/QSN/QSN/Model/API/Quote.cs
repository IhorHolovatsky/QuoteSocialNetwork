using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.ComponentModel.DataAnnotations;

namespace QSN.Model
{
    public class Quote 
    {
        public Guid Id { get; set; }
        
        public string Author { get; set; }

        public string Location { get; set; }
        
        public DateTime Date { get; set; }

        public string Text { get; set; }

        public string UserId { get; set; }

        public Guid? GroupId { get; set; }
        
        public virtual User User { get; set; }

        public virtual Group Group { get; set; }
    }
}