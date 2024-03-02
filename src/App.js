import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tictactoe from './Tictactoe';
import Connect4 from './Connect4';
import empty_pfp from './img/user_avatar.png';
import GameSelection from './GameSelection';
import './App.css';

function App() {
  return (
    <Router>
      <header className="App-header">
        <h1 className='header-text'>Board Game Hub</h1>
        <img src={empty_pfp} className="pfp-img" alt="profile" />
      </header>

      <Routes>
        <Route path="/" element={<GameSelection />} />
        <Route path="/Connect4" element={<Connect4 />} />
        <Route path="/Tictactoe" element={<Tictactoe />} />
      </Routes>
    </Router >
  );
}

export default App;