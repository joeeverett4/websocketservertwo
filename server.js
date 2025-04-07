const WebSocket = require('ws');

// Create a new WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('New client connected');

    // Send a welcome message to the client
    ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));

    // Handle incoming messages from the client
    ws.on('message', (message) => {
        // Broadcast the message to all connected clients
        console.log(message)
        const jzmesage = message.toString()
        console.log(jzmesage)
        console.log(typeof message)
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                console.log(`Sending message: ${message}`);
                client.send(jzmesage);
            }
        });
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });

    // Handle errors
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server is running on ws://localhost:8080'); 