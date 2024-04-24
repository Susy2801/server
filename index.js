var express = require("express");
const http = require("http");
var app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
// nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được.

socketIo.on("connection", (socket) => {
  ///Handle khi có connect từ client tới
  var timeStamp = new Date();
  console.log(`New client connected ${socket.id} ${timeStamp}`);

  socket.on("sendDataClient", function (data) {
    // Handle khi có sự kiện tên là sendDataClient từ phía client
    socketIo.emit("sendDataServer", { data }); // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  });

  socket.on("disconnect", () => {
    var timeStamp = new Date();
    console.log(`Client disconnected ${socket.id} ${timeStamp}`); // Khi client disconnect thì log ra terminal.
  });
});

server.listen(3000, () => {
  console.log("Server đang chay tren cong 3000");
});
