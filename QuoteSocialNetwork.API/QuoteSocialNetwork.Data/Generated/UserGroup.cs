using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuoteSocialNetwork.Data.Generated
{
    public class UserGroup
    {
        public string UserId {get; set;}

        public Guid GroupId {get; set;}

        [ForeignKey("UserId")]
        public virtual User User {get;set;}

        [ForeignKey("GroupId")]
        public virtual Group Group {get;set;}
    }
}