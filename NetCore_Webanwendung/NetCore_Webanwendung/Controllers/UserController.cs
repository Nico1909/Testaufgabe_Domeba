using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using NetCore_Webanwendung.Data;
using NetCore_Webanwendung.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NetCore_Webanwendung.Controllers
{
    /// <summary>
    /// Controller class for User Login and User Registration
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserDbContext _userDbContext;
        private readonly UserDbContextSQLite _userDbContextSQLite;
        private readonly BusinessDbContext _businessDbContext;
        private readonly BusinessDbContextSQLite _businessDbContextSQLite;
        
        private readonly IConfiguration _configuration;

        public UserController(UserDbContext userDbContext, BusinessDbContext businessDbContext,
            BusinessDbContextSQLite businessDbContextSQLite, UserDbContextSQLite userDbContextSQLite,
            IConfiguration configuration )
        {
            _userDbContext = userDbContext;
            _businessDbContext = businessDbContext;
            _businessDbContextSQLite = businessDbContextSQLite;
            _configuration = configuration;
            _userDbContextSQLite = userDbContextSQLite;
        }

        /// <summary>
        /// This method returns all industryTypes currently used in the database as List of strings
        /// </summary>
        [HttpGet("GetIndustryTypes")]
        public async Task<ActionResult<List<string>>> GetAllIndustryTypesFromDataBase()
        {
            List<string> industryTypes = new List<string>();

            //connection to sql-Server possible
            if(_businessDbContext.Database.CanConnect())
            {
                var businesses = await _businessDbContext.Businesses.ToListAsync();

                foreach (var business in businesses)
                {
                    if (!industryTypes.Contains(business.IndustryType))
                        industryTypes.Add(business.IndustryType);
                }
            }
            //else use SQLite
            //Also uses SQLite if list of industryTypes is empty
            else if(!_businessDbContext.Database.CanConnect() || industryTypes.Count == 0)
            {
                var businesses = await _businessDbContextSQLite.Businesses.ToListAsync();

                foreach (var business in businesses)
                {
                    if (!industryTypes.Contains(business.IndustryType))
                        industryTypes.Add(business.IndustryType);
                }
            }

            return (industryTypes);
        }

        /// <summary>
        /// Checks if given Uername already exists
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        [HttpGet("Username/{username}")]
        public async Task<ActionResult<bool>> CheckIfUsernameAlreadyExists(string username)
        {
            bool exists = false;

            if (_businessDbContext.Database.CanConnect())
            {
                if (await _userDbContext.Users.FirstOrDefaultAsync(u => u.UserName.Equals(username)) != null)
                    exists = true;
            }
            else
            {
                if (await _userDbContextSQLite.Users.FirstOrDefaultAsync(u => u.UserName.Equals(username)) != null)
                    exists = true;
            }

            return Ok(exists);
        }

        /// <summary>
        /// Login for User
        /// </summary>
        /// <param name="userToLogin"></param>
        /// <returns></returns>
        [HttpPost("Login")]
        public async Task<ActionResult<User>> LoginWithUserData(User userToLogin)
        {
            if (userToLogin == null || (userToLogin.UserName == "" && userToLogin.Email == ""))
                return BadRequest("LoginDatas are missing!");

            User user = FindUserInDataBase(userToLogin).Result.Value;

            if(user == null)
                return NotFound("User not found!");

            if (user.Password != userToLogin.Password)
                return BadRequest("Wrong Password!");

            //var token = CreateToken(user);

            return Ok(user);
        }

        /// <summary>
        /// Checks if the user is registered in the DataBase
        /// </summary>
        /// <param name="userToLogin"></param>
        /// <returns></returns>
        private async Task<ActionResult<User>> FindUserInDataBase(User userToLogin)
        {
            User user;

            if (_businessDbContext.Database.CanConnect())
            {
                if(userToLogin.UserName != "")
                    user = await _userDbContext.Users.FirstOrDefaultAsync(u => u.UserName.Equals(userToLogin.UserName));
                else
                    user = await _userDbContext.Users.FirstOrDefaultAsync(u => u.Email.Equals(userToLogin.Email));
            }
            else
            {
                if (userToLogin.UserName != "")
                    user = await _userDbContextSQLite.Users.FirstOrDefaultAsync(u => u.UserName.Equals(userToLogin.UserName));
                else
                    user = await _userDbContextSQLite.Users.FirstOrDefaultAsync(u => u.Email.Equals(userToLogin.Email));
            }

            return user;
        }


        /// <summary>
        /// This method is used for the registration of a new business with a new User.
        /// </summary>
        /// <param name="businessWithUser"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("SaveBusinessWithUser")]
        public async Task<ActionResult<BusinessWithUser>> SaveBusinessWithUser([FromBody] BusinessWithUser businessWithUser)
        {
            if (businessWithUser == null 
                || businessWithUser.User == null 
                || businessWithUser.Business == null) 
                return BadRequest("Business or User is null!");

            Business business;

            //Add for SQL Server
            if (_businessDbContext.Database.CanConnect())
            {
                await _businessDbContext.Businesses.AddAsync(businessWithUser.Business);
                await _businessDbContext.SaveChangesAsync();
            }

            if(_userDbContext.Database.CanConnect())
            {
                business = 
                    await _businessDbContext.Businesses.FirstOrDefaultAsync(b => b.Name.Equals(businessWithUser.Business.Name));

                if (business != null)
                    businessWithUser.User.BusinessId = business.ID;

                await _userDbContext.Users.AddAsync(businessWithUser.User);
                await _userDbContext.SaveChangesAsync();
            }

            //Add for SQLite
            await _businessDbContextSQLite.Businesses.AddAsync(businessWithUser.Business);
            
            business =
                   await _businessDbContextSQLite.Businesses.FirstOrDefaultAsync(b => b.Name.Equals(businessWithUser.Business.Name));

            if (business != null)
                businessWithUser.User.BusinessId = business.ID;

            await _userDbContextSQLite.Users.AddAsync(businessWithUser.User);

            await _userDbContextSQLite.SaveChangesAsync();
            await _businessDbContextSQLite.SaveChangesAsync();

            return Ok(businessWithUser);
        }
    }
}
