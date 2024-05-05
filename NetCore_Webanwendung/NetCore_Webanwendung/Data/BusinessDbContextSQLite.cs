using Microsoft.EntityFrameworkCore;
using NetCore_Webanwendung.Models;

namespace NetCore_Webanwendung.Data
{
    public class BusinessDbContextSQLite : DbContext
    {
        public BusinessDbContextSQLite(DbContextOptions<BusinessDbContextSQLite> options)
            : base(options)
        { }

        public DbSet<Business> Businesses { get; set; }
    }
}
