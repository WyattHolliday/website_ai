import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TictactoeMenu.css';

function TictactoeMenu() {
  let navigate = useNavigate();
  const initialChooseSymbolX = JSON.parse(localStorage.getItem('chooseSymbolX')) !== null ? JSON.parse(localStorage.getItem('chooseSymbolX')) : true;
  const [useAI, setUseAI] = useState(JSON.parse(localStorage.getItem('useAI')) || true);
  const [AIFirst, setAIFirst] = useState(JSON.parse(localStorage.getItem('AIFirst')) || false);
  const [chooseSymbolX, setChooseSymbolX] = useState(initialChooseSymbolX);
  const [chooseSymbolO, setChooseSymbolO] = useState(JSON.parse(localStorage.getItem('chooseSymbolO')) || false);
  const [AIDifficulty, setAIDifficulty] = useState(JSON.parse(localStorage.getItem('AIDifficulty')) || 5);

  useEffect(() => {
    localStorage.setItem('useAI', useAI);
    localStorage.setItem('AIFirst', AIFirst);
    localStorage.setItem('chooseSymbolX', chooseSymbolX);
    localStorage.setItem('chooseSymbolO', chooseSymbolO);
    localStorage.setItem('AIDifficulty', AIDifficulty);
  }, [useAI, AIFirst, chooseSymbolX, chooseSymbolO, AIDifficulty]);

  function handleBackToHome() {
    navigate('/', { replace: true });
  }

  function play() {
    let url = `/tictactoe/Tictactoe?useAI=${useAI}&AIFirst=${AIFirst}&chooseSymbolX=${chooseSymbolX}&AIDifficulty=${AIDifficulty}`;
    navigate(url, { replace: true });
  }

  function handleUseAIChange(event) {
    setUseAI(event.target.checked);
  }
  
  function handleAIFirstChange(event) {
    setAIFirst(event.target.checked);
  }

  function handleChooseSymbolXChange(event) {
    setChooseSymbolX(event.target.checked);
    if (event.target.checked) {
      setChooseSymbolO(false);
    } else {
      setChooseSymbolX(true);
    }
  }

  function handleChooseSymbolOChange(event) {
    setChooseSymbolO(event.target.checked);
    if (event.target.checked) {
      setChooseSymbolX(false);
    } else {
      setChooseSymbolO(true);
    }
  }

  const setAIDifficultyChange = (event) => {
    setAIDifficulty(event.target.value);
  };

  const resetOptions = () => {
    setUseAI(true);
    setAIFirst(false);
    setChooseSymbolX(true);
    setChooseSymbolO(false);
    setAIDifficulty(5);
  }

  return (
    <>
      <div className="menu">
        <h1>Tic Tac Toe</h1>
        <div className='menu-container' id='options-container'>
          <h2 className='options'>options</h2>
          <div className='option-container' id='use-ai-container'>
            <label className='options-label' htmlFor="use-ai">Use AI</label>
            <input type="checkbox" id="use-ai" name="Use AI" checked={useAI} onChange={handleUseAIChange} />
          </div>
          <div className='option-container' id='ai-first-container'>
            <label className='options-label' htmlFor="ai-first">AI goes first</label>
            <input type="checkbox" id="ai-first" name="AI goes first" checked={AIFirst} onChange={handleAIFirstChange} />
          </div>
          <div className='option-container' id='choose-symbol-container'>
            <p className='options-label' id='options-label-choose-first'>Choose your symbol</p>
            <label className='options-label' htmlFor="X">X</label>
            <input type="checkbox" id="choose-symbol-X" name="X" checked={chooseSymbolX} onChange={handleChooseSymbolXChange} />
            <label className='options-label' htmlFor="O">O</label>
            <input type="checkbox" id="choose-symbol-O" name="O" checked={chooseSymbolO} onChange={handleChooseSymbolOChange} />
          </div>
          <div className='option-container' id='ai-difficulty-container'>
            <p className='ai-difficulty-p'>AI Difficulty</p>
            <input
              id='ai-difficulty-slider'
              type="range"
              min="2"
              max="10"
              value={AIDifficulty}
              onChange={setAIDifficultyChange}
              style={{ width: '100%' }}
            />
            <p className='ai-difficulty-p'>Value: {AIDifficulty}</p>
          </div>
        </div>
        <div className='menu-container' id='rules-container'>
          <h2>Rules</h2>
          <p className='info-text'>Get 3 in a row to win!</p>
        </div>
        <div className='menu-container' id='about-ai-container'>
          <h2>About the AI</h2>
          <p className='info-text'>This AI uses a minimax decision algorithm</p>
        </div>
        <div className='button-container'>
          <button id='play-button' onClick={play}>Play!</button>
        </div>
        <div className='menu-button-container' id='bottom-button-container'>
          <button onClick={handleBackToHome}>Back to Home</button>
          <button id='reset-options-button' onClick={resetOptions}>Reset Options</button>
        </div>
      </div>
    </>
  );
}

export default TictactoeMenu;