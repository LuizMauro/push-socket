const express = require("express");
const io = require("socket.io");
const cors = require("cors");

const global = require("./global.js");
const { triggerSocket } = require("./sockets");

const app = express();
const { Server } = require("http");
const server = Server(app);
const socket = io(server);

socket.on("connect", (socket) => {
  socket.on("registerevents", (event) => {
    socket.join(event);
  });
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "ok" });
});

app.post("/push/event", (req, res) => {
  const { myEvent, data } = req.body;

  triggerSocket(myEvent, data);
  return res.json({ message: "event pushed", event: myEvent, data: data });
});

server.listen(process.env.PORT || 3333, () => {
  console.log("Rodando");
});

global.io = socket;
