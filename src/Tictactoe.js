import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { find_best_move } from './TictactoeAI';
import './Tictactoe.css';

function Tictactoe() {
  let navigate = useNavigate();

  function handleBackToHome() {
    navigate('/', { replace: true });
  }

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);
  let gameIsDone = false;

  const renderSquare = (i) => {
    return (
      <button className="square col" onClick={() => handleClick(i)}>
        {board[i]}
      </button>
    );
  };

  const handleClick = (i) => {
    if (!gameIsDone && board[i] === null) {
      const newBoard = [...board];
      newBoard[i] = xIsNext ? 'X' : 'O';
      setBoard(newBoard);
      // Check for winner after player's move
      const playerWinner = calculateWinner(newBoard);
      if (!playerWinner) {
        // Proceed with AI's move if game is not won by the player
        const aiMove = find_best_move(newBoard);
        if (aiMove !== null) {
          // Update the board with AI's move
          const updatedBoard = [...newBoard];
          updatedBoard[aiMove] = !xIsNext ? 'X' : 'O';
          setBoard(updatedBoard);
        }
      }
    }
  };

  const getStatus = () => {
    if (winner) {
      gameIsDone = true;
      return `Winner: ${winner}`;
    } else {
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          return ``;
        }
      }
      gameIsDone = true;
      return 'Draw!';
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

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
        <button className='home-button' onClick={handleBackToHome}>Back to Home</button>
        <button className='reset-button' onClick={() => resetGame() } >Reset</button>
      </div>
      <div className='player-container justify-content-center'>
          <p className={`player-1 col text-center player-column ${xIsNext ? 'player-turn' : 'player-not-turn'}`}>player 1 (X)</p>
          <p className={`player-2 col text-center player-column ${!xIsNext ? 'player-turn' : 'player-not-turn'}`}>player 2 (O)</p>
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