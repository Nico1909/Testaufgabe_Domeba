using Microsoft.EntityFrameworkCore;
using NetCore_Webanwendung.Models;

namespace NetCore_Webanwendung.Data
{
    public class UserDbContextSQLite : DbContext
    {
        public UserDbContextSQLite(DbContextOptions<UserDbContextSQLite> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
