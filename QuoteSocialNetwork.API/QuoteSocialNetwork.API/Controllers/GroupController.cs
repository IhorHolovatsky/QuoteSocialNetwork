using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuoteSocialNetwork.Data;
using QuoteSocialNetwork.Data.Generated;

namespace QuoteSocialNetwork.API.Controllers
{
    [Route("api/[controller]")]
    public class GroupController : BaseApiController
    {
        private readonly QuoteNetDatabaseContext _dbContext;

        public GroupController(QuoteNetDatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET api/group
        [Authorize]
        [HttpGet]
        public IEnumerable<Group> Get(int itemsPerPage = 20,
                                      int pageNumber = 0)
        {
            return _dbContext.Groups.Skip(itemsPerPage * pageNumber)
                                    .Take(itemsPerPage)
                                    .OrderByDescending(q => q.CreatedAt)
                                    .ToList();
        }

        // GET api/group/user
        [Authorize]
        [HttpGet]
        [Route("user")]
        public IEnumerable<Group> GetUserGroups()
        {
            var groups = from g in _dbContext.Groups
                         join ug in _dbContext.UserGroups on g.Id equals ug.GroupId
                         where ug.UserId == UserId
                         orderby g.Name
                         select g;

            groups.Include(g => g.Quotes).Load();

            return groups.ToList();
        }

        // GET api/group/5
        [Authorize]
        [HttpGet("{groupId}")]
        public Group Get(Guid groupId)
        {
            return _dbContext.Groups.Include(g => g.UserGroups)
                                    .ThenInclude(ug => ug.User)
                                    .Include(g => g.Quotes)
                                    .ThenInclude(q => q.User)
                                    .FirstOrDefault(g => g.Id == groupId);
        }

        // POST api/group
        [Authorize]
        [HttpPost]
        public Group Post([FromBody] Group group)
        {
            group.UserGroups.Add(new UserGroup{
                Group = group,
                UserId = UserId
            });

            var savedGroup = _dbContext.Groups.Add(group);
            _dbContext.SaveChanges();

            return savedGroup.Entity;
        }

        // POST api/group/join/5
        [Authorize]
        [HttpPost]
        [Route("join/{groupId}")]
        public object Join(Guid groupId)
        {
            var group = _dbContext.Groups.FirstOrDefault(g => g.Id == groupId);

            if (group == null)
            {
                return new
                {
                    error = "No group found!"
                };
            }

            var groupSubscription = new UserGroup();
            groupSubscription.GroupId = group.Id;
            groupSubscription.UserId = UserId;

            var userGroup = _dbContext.UserGroups.Add(groupSubscription);
            _dbContext.SaveChanges();

            return userGroup;
        }

        // POST api/group/leave/5
        [Authorize]
        [HttpPost]
        [Route("leave/{groupId}")]
        public object Leave(Guid groupId)
        {
            var userGroup = _dbContext.UserGroups.FirstOrDefault(ug => ug.UserId == UserId
                                                                       && ug.GroupId == groupId);

            if (userGroup == null)
            {
                return new
                {
                    error = "User is not a part of this group!"
                };
            }

            _dbContext.Entry(userGroup).State = EntityState.Deleted;
            _dbContext.SaveChanges();

            return userGroup;
        }

        // DELETE api/group/5
        [Authorize] 
        [HttpDelete("{groupId}")]
        public object Delete(Guid groupId)
        {
            var group = Get(groupId);

            if (group == null){
                return new {
                    error = "Group was not found"
                };
            }

            var deletedQuote = _dbContext.Groups.Remove(group);
            _dbContext.SaveChanges();
            return deletedQuote.Entity;
        }
    }
}