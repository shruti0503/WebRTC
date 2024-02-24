import React, { useState, useCallback, useEffect } from 'react';
import { useSocket } from '../context/socketProvider';
import { useNavigate } from 'react-router-dom';

export default function Lobby() {
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState('');
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    const handleJoinRoom = (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    };

    socket.on('room:join', handleJoinRoom);

    return () => {
      socket.off('room:join', handleJoinRoom);
      
    };
  }, [socket, navigate]);

  const handleSubmitForm = useCallback((e) => {
    e.preventDefault();
    socket.emit('room:join', { email, room });
    console.log({
      email,
      room,
    });
    navigate(`/room/${room}`);
  }, [email, room, socket]);

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor='email'>Lobby</label>
        <input
          type='email'
          id='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor='room'>Room Number</label>
        <input
          type='text'
          id='room'
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
}
