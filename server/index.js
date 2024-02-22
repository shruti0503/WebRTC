const {Server, Socket}=require("socket.io");
const io= new Server(8000)

// event listener to make a connection
io.on('connection', (socket)=>{
    // every socket is assigned a id
    console.log(`Socker Connected`, socket.id)
})