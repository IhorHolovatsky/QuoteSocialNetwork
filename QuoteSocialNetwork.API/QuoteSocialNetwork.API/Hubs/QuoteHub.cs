using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System;
using QuoteSocialNetwork.Data.Generated;

namespace QuoteSocialNetworkAPI.SignalRHubs
{
    public class QuoteHub : Hub
    {
        public Task Send(Quote quote, Guid groupId)
        {

            return Clients.Group(groupId.ToString())
                          .InvokeAsync("Send", quote);
        }

        public Task JoinToGroup(Guid groupId)
        {
            return Groups.AddAsync(Context.ConnectionId, groupId.ToString());
        }

        public Task LeaveGroup(Guid groupId)
        {
            return Groups.RemoveAsync(Context.ConnectionId, groupId.ToString());
        }
    }
}