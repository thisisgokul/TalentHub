let onlineUsers = [];

const socketServer = (socket, io) => {
  socket.on('join', (user) => {
    socket.join(user);

    // add online users
    if (!onlineUsers.some((u) => u.userId === user)) {
      onlineUsers.push({ userId: user, socketId: socket.id });
    }

    // send online users to frontend
    io.emit('get-online-users', onlineUsers);

    // send socket id
    io.emit('get-socketid', socket.id);
  });

  // socket disconnects
  socket.on('disconnect', () => {
    const disconnectedUser = onlineUsers.find((user) => user.socketId === socket.id);

    if (disconnectedUser) {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      io.emit('get-online-users', onlineUsers);
    }
  });

  socket.on('join conversation', (conversation) => {
    socket.join(conversation);
    console.log('user joined the conversation:', conversation);
  });

  // call
  socket.on('call user', (data) => {
    let userId = data.userToCall;
    let userSocket = onlineUsers.find((user) => user.userId === userId);

    if (userSocket) {
      io.to(userSocket.socketId).emit('call user', {
        signal: data.signal,
        from: data.from,
        name: data.name,
        picture: data.picture,
      });
    } else {
      console.error('User not found:', userId);
    }
  });

  // handle user sign out
  socket.on('userOffline', (userId) => {
    onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
    io.emit('get-online-users', onlineUsers);
  });
};

module.exports = socketServer;
