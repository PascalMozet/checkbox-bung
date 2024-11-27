import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

app.use(cors({ origin: ["*", "http://localhost:3000"] }));
app.use(express.static("../client/dist"));

const checkboxes = [];

for (let y = 0; y < 20; y++) {
  if (!checkboxes[y]) checkboxes[y] = [];
  for (let x = 0; x < 20; x++) {
    checkboxes[y][x] = false;
  }
}

io.on("connection", (socket) => {
  socket.emit("init", checkboxes);
  socket.on("update", (barcelona) => {
    checkboxes[barcelona.y][barcelona.x] = barcelona.value;
    io.emit("update", barcelona);
  });
});

httpServer.listen(3000, () => {
  console.log("open on 3000");
});
