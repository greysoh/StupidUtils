import { createServer, Socket } from "node:net";

export function tcp(entry) {
  const server = createServer();
  
  server.on("connection", (socket) => {
    const localSocket = new Socket();

    const serverSocketMessageBuffer = [];
    let isSocketConnected = false;

    localSocket.on("connect", () => {
      isSocketConnected = true;

      serverSocketMessageBuffer.forEach((i) => localSocket.write(i));
      serverSocketMessageBuffer.splice(0, serverSocketMessageBuffer.length);
    })

    localSocket.on("data", (data) => {
      socket.write(data);
    });
  
    socket.on("data", (data) => {
      if (!isSocketConnected) return serverSocketMessageBuffer.push(data);
      localSocket.write(data);
    });

    localSocket.connect(entry.sourcePort, entry.sourceIP);
    
    localSocket.on("error", (e) => {
      console.error("[local socket] Recieved error:", e);
      console.error("Closing...");
      
      socket.end();
      localSocket.end();
    });

    socket.on("error", (e) => {
      console.error("[main socket] Recieved error:", e);
      console.error("Closing...");

      socket.end();
      localSocket.end();
    });

    localSocket.on("end", () => socket.end());
    socket.on("end", () => socket.end());
  });

  server.listen(entry.destPort);
}