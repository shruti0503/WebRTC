import logo from './logo.svg';
import './App.css';
import Lobby from './screens/lobby';
import { SocketProvider } from './context/socketProvider';
import {Routes, Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/"  element={<Lobby />}/>
         
      </Routes>
      
    </div>
  );
}

export default App;
