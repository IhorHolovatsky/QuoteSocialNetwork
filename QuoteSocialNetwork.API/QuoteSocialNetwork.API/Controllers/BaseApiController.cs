using Microsoft.AspNetCore.Mvc;
using System.Linq;
using QuoteSocialNetwork.UTIL.Enums;

namespace QuoteSocialNetwork.API.Controllers
{
    public class BaseApiController : Controller
    {
        public string UserId 
        {
            get
            {
                return User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.USER_ID)?.Value;
            }
        }
    }
}