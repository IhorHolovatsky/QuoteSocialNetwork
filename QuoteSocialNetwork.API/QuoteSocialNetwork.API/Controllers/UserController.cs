using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuoteSocialNetwork.API.Controllers;
using QuoteSocialNetwork.Data;
using QuoteSocialNetwork.Data.Generated;

namespace QuoteSocialNetworkAPI.Controllers
{
    [Route("api/[controller]")]
    public class UserController : BaseApiController
    {
        private readonly QuoteNetDatabaseContext _dbContext;
        
        public UserController(QuoteNetDatabaseContext dbContext) {
            _dbContext = dbContext;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<User> Get(int itemsPerPage = 20, 
                                     int pageNumber = 0)
        {
            var a = User;
            return _dbContext.Users.Skip(itemsPerPage * pageNumber)
                                   .Take(itemsPerPage)
                                   .OrderBy(u => u.FullName)
                                   .ToList();
        }

        [HttpGet]
        [Route("exists")]
        public bool Exists(string userId) {
           return isUserExists(userId);
        }

        [HttpPost]
        [Route("add")]
        public object AddNewUser([FromBody] User user) {
            if (isUserExists(user.Id)) {
                return null;
            }

            var addedUser = _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return addedUser.Entity;
        }

        private bool isUserExists(string userId) {
             if (string.IsNullOrWhiteSpace(userId)) {
                return false;
            }

            return _dbContext.Users.Any(u => u.Id == userId);
        }
    }
}
