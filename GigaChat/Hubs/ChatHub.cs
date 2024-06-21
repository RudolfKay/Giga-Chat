using Microsoft.AspNetCore.SignalR;
using GigaChat.Models;

namespace GigaChat.Hubs;

public class ChatHub : Hub
{
    public async Task JoinChat(UserConnection connection)
    {
        await Clients.All
                     .SendAsync("ReceiveMessage", "admin", $"{connection.Username} has joined the chatroom");
    }

    public async Task JoinSpecificChat(UserConnection connection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);
        await Clients.Group(connection.ChatRoom)
                     .SendAsync("ReceiveMessage", "admin", $"{connection.Username} has joined {connection.ChatRoom}");
    }
}