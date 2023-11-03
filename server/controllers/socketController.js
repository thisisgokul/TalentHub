// const handleSocketConnection = (io) => {
//     io.on("connection", (socket) => {
//         socket.emit("me", socket.id);

//         socket.on("disconnect", () => {
//             socket.broadcast.emit("callEnded")
//         });

//         socket.on("callUser", ({ userToCall, signalData, from, name }) => {
//             io.to(userToCall).emit("callUser", { signal: signalData, from, name });
//         });

//         socket.on("answerCall", (data) => {
//             io.to(data.to).emit("callAccepted", data.signal)
//         });
//     });
// };

const handleSocketConnection=(io)=>{
    io.on("connection",(socket)=>{
        socket.emit("me",socket.id);

        socket.on("disconnect",()=>{
            socket.broadcast.emit("callEnded")
        });

        socket.on("callUser",({userToCall,signalData,from,name})=>{
            io.to(userToCall).emit("callUser",{signal:signalData,from,name});
        });

        socket.on("answerCall",(data)=>{
            io.to(data.to).emit("callAccepted",data.signal)
        });

    })
}
module.exports = handleSocketConnection;
