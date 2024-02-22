import React, {useState} from 'react'

export default function Lobby() {

    const [email, setEmail]=useState('');
    const [room, setRoom]=useState("")




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
