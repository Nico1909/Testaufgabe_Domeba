using Microsoft.EntityFrameworkCore;
using NetCore_Webanwendung.Models;

namespace NetCore_Webanwendung.Data
{
    public class BusinessDbContext : DbContext
    {
        public BusinessDbContext(DbContextOptions<BusinessDbContext> options) 
            : base(options)
        { }

        public DbSet<Business> Businesses { get; set; }
    }
}
