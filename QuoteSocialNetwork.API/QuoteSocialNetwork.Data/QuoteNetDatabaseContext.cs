using Microsoft.EntityFrameworkCore;
using QuoteSocialNetwork.Data.Generated;

namespace QuoteSocialNetwork.Data
{
    public class QuoteNetDatabaseContext : DbContext
    {
       public QuoteNetDatabaseContext(DbContextOptions options) : base(options)
       {
       }
       
       protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
       {
       }

       public virtual DbSet<Quote> Quotes { get; set; }
       public virtual DbSet<User> Users { get; set; }
    }
}