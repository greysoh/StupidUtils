import { Socket } from 'node:net';

// Create TCP client
const client = new Socket();

// Connect to server
client.connect(8080, '127.0.0.1', () => {
  console.log(`Connected to server at ${HOST}:${PORT}`);
  client.write('Hello, world!');
});

// Handle data from server
client.on('data', (data) => {
  console.log('Received:', data.toString());
});

// Handle server connection closed
client.on('close', () => {
  console.log('Connection closed');
});
