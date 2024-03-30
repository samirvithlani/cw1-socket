const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
app.use(express.static('public'));

const {Server} = require('socket.io');
const io = new Server(server);

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