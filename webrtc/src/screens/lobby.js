import React, {useState, useCallback, useEffect} from 'react'
import { useSocket } from '../context/socketProvider';



export default function Lobby() {

    const [email, setEmail]=useState('');
    const [room, setRoom]=useState("")
    const socket =useSocket();
    console.log(socket)
    console.log(email, room)
    useEffect(()=>{
        socket.on('room:join', data=>{console.log(`Data from BE ${data}`)})

        return ()=>{
            socket.off('room:join', handleJoinRoom)
        }
    },[socket])

    const handleSubmitForm=useCallback(
        (e)=>{
            e.preventDefault();
            socket.emit(socket.id).emit('room:join', {email, room})
            console.log({
                email,
                room
            },[email,room, socket])
        }
    )

    const handleJoinRoom=useCallback((data)=>{
        const{email, room}=data
    },[])




  return (
    <div>
        <h1>Lobby</h1>
        <form onSubmit={handleSubmitForm}>
            <label htmlFor='email'>Lobby</label>
            <input type='email' id='email'
            onChange={(e)=>setEmail(e.target.value)}
             />
            <br />
            <label htmlFor='room'>Room Number</label>
            <input type='text' id='room'
            onChange={(e)=>setRoom(e.target.value)}
            
            />
            <br />
            <button>Join</button>
        </form>
    </div>

  )
}
