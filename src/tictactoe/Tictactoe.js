import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { find_best_move } from './TictactoeAI';
import './Tictactoe.css';

function Tictactoe() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const useAI = params.get('useAI');
  const AIFirst = params.get('AIFirst');
  const chooseSymbolX = params.get('chooseSymbolX');
  const AIDifficulty = parseInt(params.get('AIDifficulty'));
  const [resetCount, setResetCount] = useState(0);

  let navigate = useNavigate();

  function handleBackToMenu() {
    navigate('/tictactoe/TictactoeMenu', { replace: true });
  }

  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerIsNext, setplayerIsNext] = useState(AIFirst === 'false' ? true : false);
  const [gameIsDone, setGameIsDone] = useState(false);
  const [playerIsX, setplayerIsX] = useState(chooseSymbolX === 'true' ? true : false);

  useEffect(() => { // Runs when the component mounts
  if (useAI === 'true' && AIFirst === 'true' && !gameIsDone && !playerIsNext && resetCount === 0) {
    // AI's move
    const aiMove = find_best_move(board, !playerIsX ? 'X' : 'O', AIDifficulty);
    const updatedBoard = [...board];
    updatedBoard[aiMove] = !playerIsX ? 'X' : 'O';
    setBoard(updatedBoard);
    // Now it's player's turn
    setplayerIsNext(true);
  }
}, [board, AIDifficulty, playerIsX, useAI, AIFirst, gameIsDone, playerIsNext, resetCount]);

  const renderSquare = (i) => {
    return (
      <button className="square col" onClick={() => handleClick(i)}>
        {board[i]}
      </button>
    );
  };

  const handleClick = (i) => {
    if (!gameIsDone) {
      const newBoard = [...board];
      // Make player's move
      newBoard[i] = playerIsX ? 'X' : 'O';
      setBoard(newBoard);

      // Check if game is done
      const winner = calculateWinner(newBoard);
      if (winner === 'X' || winner === 'O' || winner === 'Draw!') {
        setGameIsDone(true);
      } else if (useAI === 'true') {
        // Get next move
        const aiMove = find_best_move(newBoard, !playerIsX ? 'X' : 'O', AIDifficulty);
        if (aiMove !== null && newBoard[aiMove] === null) {
          // Update the board with AI's move
          const updatedBoard = [...newBoard];
          updatedBoard[aiMove] = !playerIsX ? 'X' : 'O';
          setBoard(updatedBoard);
        }
      } else {
        // Switch player
        setplayerIsX(!playerIsX);
      }
    }
  };

  const getStatus = () => {
    const winner = calculateWinner(board);
    if (winner) {
      return `Winner: ${winner}`;
    } else {
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          return ``;
        }
      }
      return 'Draw!';
    }
  };

  const resetGame = () => {
    const newBoard = Array(9).fill(null);
    setBoard(newBoard);
    setplayerIsNext(AIFirst === 'false');
    if (AIFirst === 'true') {
      // Immediately make AI's move
      const aiMove = find_best_move(newBoard);
      const updatedBoard = [...newBoard];
      updatedBoard[aiMove] = !playerIsX ? 'X' : 'O';
      setBoard(updatedBoard);
      setplayerIsNext(true);
    }
    setGameIsDone(false);
    setResetCount(resetCount + 1);
  };

  return (
    <>
      <h1 className='text-center'>Tic Tac Toe</h1>
      <div className='board col-6 mx-auto'>
        <div className="status">{getStatus()}</div>
        <div className="board-row row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className='button-container text-center'>
        <button className='menu-button' onClick={handleBackToMenu}>Back to Menu</button>
        <button className='reset-button' onClick={() => resetGame() } >Reset</button>
      </div>
      <div className='player-container justify-content-center'>
          <p className={`player-1 col text-center player-column ${playerIsX ? 'player-turn' : 'player-not-turn'}`}>player 1 (X)</p>
          <p className={`player-2 col text-center player-column ${!playerIsX ? 'player-turn' : 'player-not-turn'}`}>player 2 (O)</p>
      </div>
    </>
  );
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Tictactoe;