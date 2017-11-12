using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuoteSocialNetwork.Data;
using QuoteSocialNetwork.Data.Generated;

namespace QuoteSocialNetworkAPI.Controllers
{
    [Route("api/[controller]")]
    public class QuoteController : Controller
    {
        private readonly QuoteNetDatabaseContext _dbContext;

        public QuoteController(QuoteNetDatabaseContext dbContext) {
            _dbContext = dbContext;
        }

        // GET api/quotes
        [Authorize] 
        [HttpGet]
        public IEnumerable<Quote> Get(int itemsPerPage = 20, 
                                      int pageNumber = 0)
        {
            return _dbContext.Quotes.Skip(itemsPerPage * pageNumber)
                                    .Take(itemsPerPage)
                                    .OrderByDescending(q => q.CreatedAt)
                                    .ToList();
        }

        // GET api/quotes/5
        [Authorize] 
        [HttpGet("{quoteId}")]
        public Quote Get(Guid quoteId)
        {
            return _dbContext.Quotes.Find(quoteId);
        }

        // POST api/quotes
        [Authorize] 
        [HttpPost]
        public Quote Post([FromBody]Quote value)
        {
            var quoteEntry = _dbContext.Quotes.Add(value);
            _dbContext.SaveChanges();
            return quoteEntry.Entity;
        }

        // DELETE api/quotes/5
        [HttpDelete("{quoteId}")]
        public Quote Delete(Guid quoteId)
        {
            var deletedQuote = _dbContext.Quotes.Remove(Get(quoteId));
            _dbContext.SaveChanges();
            return deletedQuote.Entity;
        }
    }
}
