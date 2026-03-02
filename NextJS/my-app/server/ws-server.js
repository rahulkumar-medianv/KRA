// Simple WebSocket server for chat (run with `node server/ws-server.js`)
const WebSocket = require("ws");
const port = process.env.WS_PORT || 3001;
const wss = new WebSocket.Server({ port });

let clients = new Map(); // clientId -> ws
const clientInfo = new Map(); // clientId -> { email, role }
let messages = []; // in-memory messages
let adminClients = new Set();
let idCounter = 1;

function broadcastAll(data) {
  const s = JSON.stringify(data);
  for (const ws of wss.clients) {
    if (ws.readyState === WebSocket.OPEN) ws.send(s);
  }
}

wss.on("connection", function connection(ws, req) {
  const clientId = "c" + idCounter++;
  clients.set(clientId, ws);
  ws.clientId = clientId;
  console.log(
    `[${new Date().toISOString()}] Client connected: ${clientId}, Total: ${clients.size}`,
  );

  // send a welcome + existing messages
  ws.send(JSON.stringify({ type: "welcome", clientId }));
  ws.send(JSON.stringify({ type: "history", messages }));

  ws.on("message", function incoming(raw) {
    try {
      const data = JSON.parse(raw);
      if (data?.type === "identify") {
        // { type: 'identify', role, user }
        ws.role = data.role || "user";
        if (ws.role === "admin") adminClients.add(ws);
        if (data.user?.email) {
          clientInfo.set(clientId, { email: data.user.email, role: ws.role });
        }
        return;
      }

      if (data?.type === "message") {
        // on admin reply there will be data.target indicating which client
        const targetId = data.target;
        // derive email for the message: if admin sent and supplied targetEmail, use that, otherwise use record for sender
        const senderEmail = clientInfo.get(clientId)?.email;
        const msg = {
          id: "m" + Date.now() + Math.floor(Math.random() * 1000),
          from: data.from || senderEmail || "user",
          role: data.role || "user",
          content: data.content,
          time: new Date().toISOString(),
          clientId: data.targetEmail || targetId || senderEmail || clientId,
          email: data.targetEmail || senderEmail,
        };
        messages.push(msg);
        if (targetId) {
          const targetWs = clients.get(targetId);
          const payload = JSON.stringify({ type: "message", message: msg });
          if (targetWs && targetWs.readyState === WebSocket.OPEN)
            targetWs.send(payload);
          for (const a of adminClients) {
            if (a.readyState === WebSocket.OPEN) a.send(payload);
          }
        } else {
          // Broadcast message to all connected clients (both admin and users)
          broadcastAll({ type: "message", message: msg });
        }
      }
    } catch (err) {
      console.error("Invalid message", err);
    }
  });

  ws.on("close", function () {
    clients.delete(clientId);
    if (ws.role === "admin") adminClients.delete(ws);
    console.log(
      `[${new Date().toISOString()}] Client disconnected: ${clientId}, Total: ${clients.size}`,
    );
  });
});

console.log("WebSocket server running on ws://localhost:" + port);

wss.on("error", (error) => {
  console.error("[ERROR] WebSocket server error:", error.message);
});

process.on("SIGINT", () => {
  console.log("\nShutting down WebSocket server...");
  wss.close(() => {
    console.log("WebSocket server closed");
    process.exit(0);
  });
});
