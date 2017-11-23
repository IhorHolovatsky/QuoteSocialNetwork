using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuoteSocialNetwork.API.Controllers;
using QuoteSocialNetwork.Data;
using QuoteSocialNetwork.Data.Generated;

namespace QuoteSocialNetworkAPI.Controllers
{
    [Route("api/[controller]")]
    public class QuoteController : BaseApiController
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

        
        
        // GET api/quotes/user
        [Authorize] 
        [HttpGet("user")]
        public List<Quote> GetUsersQuotes() {
            return _dbContext.Quotes.Where(q => q.UserId == UserId)
                                    .Include(q => q.User)
                                    .OrderByDescending(q => q.CreatedAt)
                                    .ToList();
        }

          
        // GET api/user/quotes/5
        [Authorize] 
        [HttpGet("user/{userId}")]
        public List<Quote> GetUsersQuotes(string userId) {
            return _dbContext.Quotes.Where(q => q.UserId == (userId ?? UserId))
                                    .ToList();
        }


        // POST api/quotes
        [Authorize] 
        [HttpPost]
        public Quote Post([FromBody]Quote value)
        {
            var quoteEntry = _dbContext.Quotes.Add(value);
            _dbContext.SaveChanges();
            _dbContext.Entry(quoteEntry.Entity).Reference(q => q.User).Load();
            return quoteEntry.Entity;
        }

        // DELETE api/quotes/5
        [Authorize] 
        [HttpDelete("{quoteId}")]
        public Quote Delete(Guid quoteId)
        {
            var deletedQuote = _dbContext.Quotes.Remove(Get(quoteId));
            _dbContext.SaveChanges();
            return deletedQuote.Entity;
        }
    }
}
