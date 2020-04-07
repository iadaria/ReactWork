using System;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        /* public DataContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        } */
        /*
        public DbSet<Value Values {get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entitty<Value>()
                .HasData(
                    new Value {Id = 1, Name = "Value 101"},
                    new Value {Id = 1, Name = "Value 101"},
                    new Value {Id = 1, Name = "Value 101"},
                );
        }V   
        */
    }
}
