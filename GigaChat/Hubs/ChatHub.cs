using Microsoft.AspNetCore.SignalR;
using GigaChat.Models;
using Gigachat.Database;

namespace GigaChat.Hubs;

public class ChatHub : Hub
{
    private readonly SharedDb _sharedDb;
    public ChatHub(SharedDb sharedDb) => _sharedDb = sharedDb;

    public async Task JoinChat(UserConnection connection)
    {
        await Clients.All
                     .SendAsync("ReceiveMessage", "admin", $"{connection.Username} has joined the chatroom");
    }

    public async Task JoinSpecificChat(UserConnection connection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);

        _sharedDb.connections[Context.ConnectionId] = connection;

        await Clients.Group(connection.ChatRoom)
                     .SendAsync("ReceiveMessage", "admin", $"{connection.Username} has joined {connection.ChatRoom}");
    }

    public async Task SendMessage(string msg)
    {
        if (_sharedDb.connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
        {
            await Clients.Group(conn.ChatRoom)
                         .SendAsync("ReceiveSpecificMessage", conn.Username, msg);
        }
    }
}