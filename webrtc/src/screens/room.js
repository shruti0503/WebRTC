import react, { useCallback , useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useSocket } from '../context/socketProvider';
import ReactPlayer from 'react-player'
import peer from '../service/peer';

const RoomPage=()=>{


    const socket=useSocket();
    const [remoteSocketId, setRemoteSocketId]=useState(null)
    const handleUSerJoined=useCallback(({email, id})=>{
        console.log(`email ${email} joined room`)
        setRemoteSocketId(id)
    },[])
   
    useEffect(()=>{
        socket.on("user:joined", handleUSerJoined);
        socket.on('incoming:call',handleIncomingCall)

        return ()=>{
            socket.off("user:joined", handleUSerJoined)
            socket.off("incoming:call", handleIncomingCall)
        }
    }, [socket, handleUSerJoined])

    const [stream, setMyStream]=useState(null);

    const handleCallUser =useCallback(async()=>{
        const stream=await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true
        })

        const offer=await peer.getOffer();
        // send this offer to other user
        socket.emit("user: call", {to:remoteSocketId,offer})
        setMyStream(stream)
    },[remoteSocketId, socket])

    const handleIncomingCall=useCallback( async({from, offer})=>{
        console.log('incoming call', from , offer)

    },[])


  

    

    return(
        <div>
            <h1>Room Page</h1>
            <h4>{remoteSocketId ? "attached":"no one in room"}</h4>
            
                {remoteSocketId && <button onClick={handleCallUser}> call</button>}
            
            {stream && <ReactPlayer playing={true} muted={true} height="300px" width="300px" url={stream} />}
        </div>
    )
}

export default RoomPage