using System;
using System.Linq;
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

        public override int SaveChanges()
        {
            var changedList = ChangeTracker.Entries()
                                           .Where(e => e.State == EntityState.Added
                                                       || e.State == EntityState.Modified
                                                       || e.State == EntityState.Deleted);


            foreach (var entity in changedList)
            {
                //Be sure that your entity to Save/Update inherits BaseEntity Class
                if (entity.Entity is BaseEntity)
                {
                    SetAuditingProperties((BaseEntity)entity.Entity, entity.State);
                }
            }

            return base.SaveChanges();
        }

        public virtual DbSet<Quote> Quotes { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<UserGroup> UserGroups { get; set; }


        private void SetAuditingProperties(BaseEntity entity, EntityState entityState)
        {
            switch (entityState)
            {
                case EntityState.Added:
                    entity.CreatedAt = DateTime.Now;
                    goto case EntityState.Modified;

                case EntityState.Modified:
                    entity.ModifiedAt = DateTime.Now;
                    break;
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserGroup>()
                .HasKey(ug => new { ug.UserId, ug.GroupId });

            modelBuilder.Entity<UserGroup>()
                .HasOne(ug => ug.User)
                .WithMany(u => u.UserGroups)
                .HasForeignKey(ug => ug.UserId);

            modelBuilder.Entity<UserGroup>()
                .HasOne(ug => ug.Group)
                .WithMany(g => g.UserGroups)
                .HasForeignKey(ug => ug.GroupId);


            modelBuilder.Entity<Quote>()
                .HasOne(ug => ug.Group)
                .WithMany(g => g.Quotes)
                .HasForeignKey(ug => ug.GroupId);;

            modelBuilder.Entity<Group>()
                        .HasMany(g => g.Quotes)
                        .WithOne(q => q.Group)
                        .OnDelete(DeleteBehavior.Cascade);


            base.OnModelCreating(modelBuilder);
        }
    }
}