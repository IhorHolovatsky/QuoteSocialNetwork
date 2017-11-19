using System;

namespace QuoteSocialNetwork.Data
{
    public class BaseEntity
    {
        public DateTime? CreatedAt { get; set; }

        public DateTime? ModifiedAt { get; set; }
    }
}