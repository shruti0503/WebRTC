import logo from './logo.svg';
import './App.css';
import Lobby from './screens/lobby';
import { SocketProvider } from './context/socketProvider';
import {Routes, Route} from 'react-router-dom'
import RoomPage from './screens/room';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/"  element={<Lobby />}/>
        <Route path="/room/:roomId" element={<RoomPage />} />
         
      </Routes>
      
    </div>
  );
}

export default App;
