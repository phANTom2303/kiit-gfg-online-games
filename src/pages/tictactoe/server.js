import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { name } from "ejs";

const port = 3000;
const app = express();
const user_name = [];
const rooms = [];

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("state", (data) => {
    console.log(data);
  });

  socket.on("new-user", (data) => {
    console.log(data);
    if (name != "") {
      user_name.push(data.name);
    }
    if (data.room != "") {
      if (rooms.includes(data.room)) {
        socket.join(data.room);
      } else {
        rooms.push(data.room);
        socket.join(data.room);
      }
    }
    socket.broadcast.emit("connected-user", data.name);
    io.emit("all-users", user_name);
  });

  socket.on("state", (data) => {
    console.log(data);
  });

  socket.on("message", (data) => {
    if (data.room != "") {
      io.to(data.room).emit("receive-mesage", data);
    } else {
      io.emit("receive-mesage", data);
    }
  });

  socket.on("disconnect", (name) => {
    socket.broadcast.emit("user-disconnected", name);
    console.log("User disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
