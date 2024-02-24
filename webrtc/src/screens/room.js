import react, { useCallback , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
const RoomPage=()=>{

    const naviagte=useNavigate();

    const handleJoinRoom=useCallback(
        (data)=>{
            const {email,room}=data;
            naviagte(`/room/${room}`)
        },[naviagte]
    )

    

    return(
        <div>
            <h1>Room Page</h1>
        </div>
    )
}

export default RoomPage