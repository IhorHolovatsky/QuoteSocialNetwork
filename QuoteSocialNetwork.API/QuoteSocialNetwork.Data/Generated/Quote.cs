using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace QuoteSocialNetwork.Data.Generated
{
    public class Quote
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set;}

        public string Text { get; set;}

        public DateTime CreatedAt { get; set; }

        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}