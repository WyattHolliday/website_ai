import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tictactoe.css';

function Tictactoe() {
  let navigate = useNavigate();

  function handleBackToHome() {
    navigate('/', { replace: true });
  }

  const [board] = useState(Array(9).fill(null));

  const renderSquare = (i) => {
    return (
      // onClick={() => handleClick(i)}>
      <button className="square col">
        {board[i]}
      </button>
    );
  };

  return (
    <>
      <h1 className='text-center'>Tic Tac Toe</h1>
      <div className='board col-6 mx-auto'>
        {/* <div className="status">{getStatus()}</div> */}
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
      </div>
    </>
  );
}

export default Tictactoe;