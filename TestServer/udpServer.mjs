import dgram from 'dgram';

// Create UDP server
const server = dgram.createSocket('udp4');

// Handle incoming messages
server.on('message', (msg, rinfo) => {
  console.log(
    `Received: ${msg.toString()} from ${rinfo.address}:${rinfo.port}`
  );
});

server.bind(8080, () => {
  console.log(`Server listening on ::8080`);
});
