import * as dgram from 'dgram';

export function udp(entry) {
  const server = dgram.createSocket('udp4');
  const clients = {};

  server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
  });

  server.on('message', (msg, rinfo) => {
    // Check to see if we already have a client connection set up
    // This is a dictionary because dict lookups are fast for some reason
    const clientID = rinfo.address + ' ' + rinfo.port;

    if (typeof clients[clientID] == 'undefined') {
      const newSock = dgram.createSocket('udp4');
      newSock.on('message', (msg, rinfo) => {
        server.send(msg, rinfo.address, rinfo.port);
      });

      clients[clientID] = newSock;
    }

    clients[clientID].send(msg, entry.sourcePort, entry.sourceIP);
  });

  // FIXME: Add script that runs every 1ish minute to clean up the remaining connections

  server.bind(entry.destPort);
}
