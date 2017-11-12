using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
 
namespace QuoteSocialNetworkAPI.SignalRHubs
{
    public class QuoteHub : Hub
    {
        public Task Send(string data)
        {
            return Clients.All.InvokeAsync("Send", new {
                quote = data
            });
        }
    }
}