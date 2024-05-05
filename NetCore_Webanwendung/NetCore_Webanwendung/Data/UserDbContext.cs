using Microsoft.EntityFrameworkCore;
using NetCore_Webanwendung.Models;

namespace NetCore_Webanwendung.Data
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) 
            :base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
