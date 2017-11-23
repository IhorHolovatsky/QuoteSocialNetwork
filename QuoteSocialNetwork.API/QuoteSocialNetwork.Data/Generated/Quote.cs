using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.ComponentModel.DataAnnotations;

namespace QuoteSocialNetwork.Data.Generated
{
    public class Quote : BaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string Text { get; set; }

        public string UserId { get; set; }

        public Guid? GroupId { get; set; }

        [ForeignKey("UserId")]
        [Required]
        public virtual User User { get; set; }

        public virtual Group Group { get; set; }
    }
}