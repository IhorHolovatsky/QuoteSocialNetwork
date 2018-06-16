using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QSN.Model
{
    public class UserGroup
    {
        public string UserId {get; set;}

        public Guid GroupId {get; set;}
        
        public virtual User User {get;set;}
        
        public virtual Group Group {get;set;}
    }
}