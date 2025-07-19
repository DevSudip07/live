const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

app.use(express.static(path.join(__dirname, "../public")));

let rooms = {};

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("create-room", () => {
    const roomId = Math.random().toString(36).substring(2, 10);
    rooms[roomId] = socket.id;
    socket.join(roomId);
    socket.emit("room-created", roomId);
  });

  socket.on("join-room", (roomId) => {
    if (rooms[roomId]) {
      socket.join(roomId);
      socket.to(roomId).emit("viewer-joined", socket.id);
      socket.emit("joined-room", true);
    } else {
      socket.emit("joined-room", false);
    }
  });

  socket.on("send-image", ({ roomId, image }) => {
    socket.to(roomId).emit("receive-image", image);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});

http.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
