using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuoteSocialNetwork.Data;
using QuoteSocialNetwork.Data.Generated;

namespace QuoteSocialNetwork.API.Controllers
{
    [Route("api/[controller]")]
    public class GroupController : BaseApiController
    {
        private readonly QuoteNetDatabaseContext _dbContext;

        public GroupController(QuoteNetDatabaseContext dbContext) {
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
    }
}