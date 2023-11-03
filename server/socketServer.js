const socketServer= (socket)=>{
    socket.on('join',(user)=>{ 
        console.log('user has joined:',user); 
        socket.join(user);
    });

    socket.on("join conversation",(conversation)=>{
        socket.join(conversation);
        console.log("user joined the conversation :",conversation);
    })
}

module.exports= socketServer  