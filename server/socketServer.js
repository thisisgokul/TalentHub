let onlineUsers=[];
const socketServer= (socket,io)=>{
    socket.on('join',(user)=>{ 
        socket.join(user);
        // add online users
        if(!onlineUsers.some((u)=>u.userId===user)){
            onlineUsers.push({userId:user,socketId:socket.id});
        }
        // send online users to frontend
        io.emit("get-online-users",onlineUsers);
        // send socket id
        io.emit("get-socketid",socket.id);
    });

    // socket disconnect
    socket.on("disconnect",()=>{
        onlineUsers=onlineUsers.filter((user)=>user.socketId!==socket.id);
        io.emit("get-online-users",onlineUsers);
    })

    socket.on("join conversation",(conversation)=>{
        socket.join(conversation);
        console.log("user joined the conversation :",conversation);
    })
}

module.exports= socketServer  