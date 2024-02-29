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
        console.log("email id", remoteSocketId)
    
        setRemoteSocketId(id)
    },[])

    useEffect(()=>{
        console.log("email id in useeff", remoteSocketId)

    },[remoteSocketId])
    
    const  handleCallAccepted=useCallback(({from, ans})=>{


    },[])

   
    useEffect(()=>{
        console.log("Setting up event listener for user:joined");
        socket.on("user:joined", handleUSerJoined);
        socket.on('incoming:call',handleIncomingCall)
        socket.on('call:accepted', handleCallAccepted)

        return ()=>{
            socket.off("user:joined", handleUSerJoined)
            socket.off("incoming:call", handleIncomingCall)
            socket.off('call:accepted', handleCallAccepted)
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
        setRemoteSocketId(from)
        const stream=await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true
        })
        setMyStream(stream)
        console.log('incoming call', from , offer)
        const ans=await peer.getAnswer(offer)
        socket.emit('call:accepted',{from:socket.id, offer} )

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