import { createSocket } from 'dgram';

// Create UDP client
const client = createSocket('udp4');

// Send message to server
const message = 'Hello, server!';
client.send(message, 9000, '127.0.0.1', (err) => {
  if (err) throw err;
  console.log(`Message sent to server: ${message}`);

  client.close();
});
