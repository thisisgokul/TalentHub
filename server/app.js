const express = require('express');
const app = express();
const { createServer } = require('http'); 
const server = createServer(app);  
const { Server } = require('socket.io');
const cors = require('cors');
const mongooseConnect = require('./config/config');
const authRouter = require('./routes/authRoutes');
const cookieparser = require('cookie-parser');
const socketServer=require("./socketServer")
const port = 5000;

// connect to database 
mongooseConnect();  

// middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'https://talent-hub-sigma.vercel.app'
}));
app.use(cookieparser());

// Routes
app.use('/api/v1', authRouter);

server.listen(port, () => {  // Use server.listen instead of app.listen
    console.log('server connected to', port);
});

// socket io
const io = new Server(server, {
  pingTimeout: 60000,
  cors: { 
    origin: 'https://talent-hub-sigma.vercel.app'
  }
});

io.on('connection', (socket) => {
  console.log('socket io connected successfully.');
  socketServer(socket,io)
});
