const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');

const server = http.createServer(app);
app.use(express.static('public'));
const socketIO = require("socket.io");

const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3001", // Adjust with your React app's URL
      methods: ["GET", "POST"],
    },
  });
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  app.use(cors());

io.on('connection',(socket)=>{
    console.log('A user connected'+socket.id);
    socket.on('user-message',(msg)=>{
        console.log('Message: ' + msg);
        io.emit('user-message',msg);
        //socket.broadcast.emit('user-message',msg);
        
    })
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})

app.get("/",(req,res)=>{
    return res.sendFile(__dirname + "/index.html");
})