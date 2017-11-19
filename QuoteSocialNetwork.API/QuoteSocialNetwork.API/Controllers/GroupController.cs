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

        // POST api/group
        [Authorize]
        [HttpPost]
        public Group Post([FromBody] Group group)
        {
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
            var group = _dbContext.Groups.Include(g => g.UserGroups).First(g => g.Id == groupId);
            var userGroup = group.UserGroups.FirstOrDefault(ug => ug.UserId == UserId);

            if (group == null)
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
    }
}