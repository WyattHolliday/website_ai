import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameDisplay from './GameDisplay';
import Tictactoe from './Tictactoe';
import empty_pfp from './img/user_avatar.png';
import tictactoe_img from './img/tictactoe.png';
// import connect4_img from './img/connect4.png';
import './App.css';

function App() {
  return (
    <Router>
      <header className="App-header">
        <h1 className='header-text'>Board Game Hub</h1>
        <img src={empty_pfp} className="pfp-img" alt="profile" />
      </header>
      <Routes>
        <Route path="/" element={<GameDisplay gameName="Tic Tac Toe" gameDescription="Play tic tac toe against opponents in offline matches!" gameImg={tictactoe_img} path="/Tictactoe" />} />
        <Route path="/Tictactoe" element={<Tictactoe />} />
      </Routes>
    </Router>
  );
}

export default App;
