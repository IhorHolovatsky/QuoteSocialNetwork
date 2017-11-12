using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuoteSocialNetwork.Data;

namespace QuoteSocialNetworkAPI.Controllers
{
    [Route("api/[controller]")]
    public class QuoteController : Controller
    {
        private readonly QuoteNetDatabaseContext _dbContext;

        public QuoteController(QuoteNetDatabaseContext dbContext) {
            _dbContext = dbContext;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            var userCount = _dbContext.Users.Count();
            return new string[] { "value1", "value2", (_dbContext == null).ToString(), userCount.ToString() };
        }
    }
}
