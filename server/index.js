const {Server, Socket}=require("socket.io");
const io= new Server(8000,{
    cors:true
})

const emailToSocketIdMap= new Map();
const socketidToEmailMap=new Map();



// email to socket id  map


// event listener to make a connection
io.on('connection', (socket)=>{
    // every socket is assigned a id
    console.log(`Socker Connected`, socket.id)
    socket.on('room:join', data=>{
        console.log(data)
        const {email, room}=data
        emailToSocketIdMap.set(email,socket.id)
        socketidToEmailMap.set(socket.id, email)
        socket.to('room:join', data)
    })
})