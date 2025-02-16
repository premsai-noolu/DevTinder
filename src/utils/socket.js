const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    //Handle events
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = [userId, targetUserId].sort().join("_");
      console.log(firstName + " Joining room :" + roomId);
      socket.join(roomId);
    });
    socket.on("sendMessage", ({ firstName, userId, targetUserId, text }) => {
      const roomId = [userId, targetUserId].sort().join("_");
      console.log(firstName + " syas " + text);
      io.to(roomId).emit("messageRecieved", { firstName, text });
    });
    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
