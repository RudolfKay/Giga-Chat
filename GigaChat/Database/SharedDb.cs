using System.Collections.Concurrent;
using GigaChat.Models;

namespace Gigachat.Database;

public class SharedDb
{
    private readonly ConcurrentDictionary<string, UserConnection> _connections = new();
    public ConcurrentDictionary<string, UserConnection> connections => _connections;
}