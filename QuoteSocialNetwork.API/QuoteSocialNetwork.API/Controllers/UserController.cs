using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        // GET api/user
        [HttpGet]
        public IEnumerable<User> Get(int itemsPerPage = 20, 
                                     int pageNumber = 0)
        {
            return _dbContext.Users.Skip(itemsPerPage * pageNumber)
                                   .Take(itemsPerPage)
                                   .OrderBy(u => u.FullName)
                                   .ToList();
        }

        // PATCH api/user
        [HttpPatch]
        public User Patch([FromBody] User user) {
            var userInDb = _dbContext.Users.FirstOrDefault(u => u.Id.Equals(user.Id));

            if (userInDb == null) {
                return null;
            }

            userInDb.FullName = user.FullName;
            userInDb.PhotoUrl = user.PhotoUrl;

            _dbContext.Entry(userInDb).State = EntityState.Modified;
            _dbContext.SaveChanges();

            return user;
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
