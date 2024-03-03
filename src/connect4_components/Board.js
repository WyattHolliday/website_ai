import Container from 'react-bootstrap/Container';
import Slot from './Slot';
import React, { useState, useEffect } from 'react';
import { timeout } from 'q';
import Form from 'react-bootstrap/Form';

let AI_DIFFICULTY = 'easy';

class playerAI {

    constructor(playerNumber, difficulty) {
        console.log("Constructing AI!");
        this.player = playerNumber;
        this.opponent = playerNumber === 1 ? 2 : 1;
        this.setDifficulty(difficulty);
        this.difficulty = difficulty;
    }

    setDifficulty(difficulty) {
        if (difficulty === "easy") this.maxDepth = 2;
        else if (difficulty === "medium") this.maxDepth = 4;
        else if (difficulty === "hard") this.maxDepth = 6;
    }

    getValidMoves(board) {
        let validMoves = [];
        let row = 5;
        let col = 0;
        while (col < 7) {
            if (board[row][col] === 0) {
                validMoves.push([row, col]);
                col += 1;
                row = 5;
            }
            else {
                row -= 1;
            }

            if (row < 0) {
                col += 1;
                row = 5;
            }
        }

        return validMoves;
    }

    fourInARow(board, player) {
        let count = 0;
        // Check for horizontal wins
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if (board[row][col] === player) {
                    count++;
                } else {
                    count = 0;
                }
                if (count === 4) return true;
            }
        }

        // Check for vertical wins
        for (let col = 0; col < board[0].length; col++) {
            for (let row = 0; row < board.length; row++) {
                if (board[row][col] === player) {
                    count++;
                } else {
                    count = 0;
                }
                if (count === 4) return true;
            }
        }

        // Check for diagonal wins
        for (let row = 0; row < board.length - 3; row++) {
            for (let col = 0; col < board[row].length - 3; col++) {
                if (board[row][col] === player && board[row + 1][col + 1] === player && board[row + 2][col + 2] === player && board[row + 3][col + 3] === player) {
                    return true;
                }
            }
        }

        for (let row = 0; row < board.length - 3; row++) {
            for (let col = 3; col < board[row].length; col++) {
                if (board[row][col] === player && board[row + 1][col - 1] === player && board[row + 2][col - 2] === player && board[row + 3][col - 3] === player) {
                    return true;
                }
            }
        }

        return false;
    }


    terminalState(board) {
        // Terminal state is when the board is full or there's a winning condition.
        if (this.fourInARow(board, this.player)) {
            return [true, this.player]
        }
        else if (this.fourInARow(board, this.opponent)) {
            return [true, this.opponent]
        }
        else if (board[0].filter(x => x !== 0).length === 7) {
            return [true, null];
        }
        else return [false, null];
    }

    terminalValue(winningPlayer) {
        // We check the board and see if there's a winning condition for the player or the opponent.
        // If so, we return a value which reflects that.
        if (winningPlayer === this.player) {
            return Infinity;
        }
        else if (winningPlayer === this.opponent) {
            return -Infinity;
        }
        else return 0;
    }

    evaluateWindow(board, row, col, deltaRow, deltaCol) {
        const WINNING_LENGTH = 4;
        const ROWS = 5;
        const COLS = 6;

        let player1Count = 0;
        let player2Count = 0;
        for (let i = 0; i < WINNING_LENGTH; i++) {
            const r = row + i * deltaRow;
            const c = col + i * deltaCol;
            if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
                if (board[r][c] === this.player) {
                    player1Count++;
                } else if (board[r][c] === this.opponent) {
                    player2Count++;
                }
            }
        }
    
        if (player1Count === WINNING_LENGTH) {
            return 100; // Player 1 wins
        } else if (player2Count === WINNING_LENGTH) {
            return -100; // Player 2 wins
        } else {
            return player1Count - player2Count; // Score based on connected pieces
        }
    }

    moveUtility(board) {
        let score = 0;
        const ROWS = 5;
        const COLS = 6;
        const WINNING_LENGTH = 4;

        // Evaluate horizontally
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col <= COLS - WINNING_LENGTH; col++) {
                score += this.evaluateWindow(board, row, col, 0, 1); // Check right
            }
        }
    
        // Evaluate vertically
        for (let row = 0; row <= ROWS - WINNING_LENGTH; row++) {
            for (let col = 0; col < COLS; col++) {
                score += this.evaluateWindow(board, row, col, 1, 0); // Check down
            }
        }
    
        // Evaluate diagonally (positive slope)
        for (let row = 0; row <= ROWS - WINNING_LENGTH; row++) {
            for (let col = 0; col <= COLS - WINNING_LENGTH; col++) {
                score += this.evaluateWindow(board, row, col, 1, 1); // Check down-right
            }
        }
    
        // Evaluate diagonally (negative slope)
        for (let row = WINNING_LENGTH - 1; row < ROWS; row++) {
            for (let col = 0; col <= COLS - WINNING_LENGTH; col++) {
                score += this.evaluateWindow(board, row, col, -1, 1); // Check up-right
            }
        }
    
        return score;
    }

    alphabetapruning(board) {
        let alpha = -Infinity;
        let beta = Infinity;
        let isMaximizing = false;
        let score;

        let bestMove = null;
        let bestScore = -Infinity;
        for (let move of this.getValidMoves(board)) {
            console.log(`AI's first move: ${move}`);
            score = this.minimax(this.makeMove(board, move, this.player), alpha, beta, this.maxDepth, isMaximizing);
            if (score >= bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
        return bestMove;
    }

    makeMove(board, move, player) {
        let newBoard = board.map(arr => arr.slice());
        let row = move[0];
        let col = move[1];
        newBoard[row][col] = player;
        return newBoard;
    }

    minimax(board, alpha, beta, remainingDepth, isMaximizing) {

        console.log("Exploring moves in minimax!");
        // Check if we're in a terminal position, then return the terminal value of the board.
        let [winningState, winningPlayer] = this.terminalState(board);
        console.log(`Winning State: ${winningState}, Winning Player: ${winningPlayer}`);
        if (winningState === true) {
            return this.terminalValue(winningPlayer);
        }

        if (remainingDepth === 0) {
            // When we've reached max depth, we 
            // return the heuristic value of the board.
            return this.moveUtility(board);
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            // Get a list of possible moves given the current board.
            // Then call minimax for each state of the board to get the utility.
            let playerMoves = this.getValidMoves(board);
            console.log(`Maximizing player's moves at depth ${this.maxDepth-remainingDepth}\n${playerMoves}`);
            for (let move of playerMoves) {
                let score = this.minimax(this.makeMove(board, move, this.player), alpha, beta,  remainingDepth - 1,  false);
                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, bestScore);
                if (beta <= alpha) break;
            }

            return bestScore;

        } else {
            let worstScore = Infinity;
            let opponentMoves = this.getValidMoves(board);
            console.log(`Minimizing player's moves at depth ${this.maxDepth-remainingDepth}\n${opponentMoves}`);
            for (let move of opponentMoves) {
                let score = this.minimax(this.makeMove(board, move, this.opponent), alpha, beta, remainingDepth - 1, true);
                worstScore = Math.min(score, worstScore);
                beta = Math.min(beta, worstScore);
                if (beta <= alpha) break;
            }
            return worstScore;
        }
    }
}


function Board() {
    const MAX_WIDTH = 7;
    const MAX_HEIGHT = 6;
    const DEFAULT_VAL = 0;
    const WINNING_COUNT = 4;
    const PLAYER_1 = 1;
    const PLAYER_2 = 2;

    const [board, setBoard] = useState(
        [...Array(MAX_HEIGHT)].map(() => { return Array(MAX_WIDTH).fill(DEFAULT_VAL) })
    );

    const [currentPlayer, setcurrentPlayer] = useState(PLAYER_1);
    const [opponentPlayer, setopponentPlayer] = useState(PLAYER_2);
    const [gameOver, setGameOver] = useState(false);


    function findTopDiagonals(row, column) {
        const topRight = [row, column];
        const topLeft = [row, column];
        const rowIndex = 0;
        const colIndex = 1;


        while ((topRight[rowIndex] > 0) && (topRight[colIndex] < 6)) {
            topRight[rowIndex] -= 1;
            topRight[colIndex] += 1;
        }


        while ((topLeft[rowIndex] > 0) && (topLeft[colIndex] > 0)) {
            topLeft[rowIndex] -= 1;
            topLeft[colIndex] -= 1;
        }

        return [topLeft, topRight];
    }

    function checkVertical(column, player) {
        let count = 0;
        for (let row = 0; row < board.length; row++) {
            if (board[row][column] === player) {
                count++;
            } else {
                count = 0;
            }
            if (count === WINNING_COUNT) {
                console.log(`Player ${player} wins!`);
                return true;
            }
        }
        return false;
    }

    function checkHorizontal(row, player) {
        let count = 0;
        // For the current row, check if there's a sequence of 4 or more of the same player's pieces.
        // Start at the beggining column. If a player's checker is there, check if there's a row of 4 or more.
        // if so, break the loop.
        for (let i = 0; i < board[row].length; i++) {
            console.log(`Checking for player ${player} at row: ${row}, column: ${i}`);
            if (board[row][i] === player) {

                count++;
                console.log(`Count: ${count}`);
            } else {
                count = 0;
            }

            if (count >= WINNING_COUNT) {
                console.log(`Player ${player} wins!`);
                return true;
            }
        }
        return false;
    }

    function checkLeftDiagonal(topLeft, player) {
        let count = 0;
        let row = topLeft[0];
        let column = topLeft[1];
        while (row < 6 && column < 7) {
            if (board[row][column] === player) {
                count++;
            } else {
                count = 0;
            }

            if (count >= WINNING_COUNT) {
                console.log(`Player ${player} wins!`);
                return true;
            }
            row++;
            column++;
        }
        return false;
    }

    function checkRightDiagonal(topRight, player) {
        let count = 0;
        let row = topRight[0];
        let column = topRight[1];
        while (row < 6 && column >= 0) {
            if (board[row][column] === player) {
                count++;
            } else {
                count = 0;
            }

            if (count >= WINNING_COUNT) {
                console.log(`Player ${player} wins!`);
                return true;
            }
            row++;
            column--;
        }
        return false;
    }

    function checkDiagonal(row, column, player) {
        // Find top left and top right diagonal values from the player's current position.
        let result = findTopDiagonals(row, column);
        const topLeft = result[0];
        const topRight = result[1];
        console.log(`Top Left: ${topLeft}, Top Right: ${topRight}`);
        return (checkLeftDiagonal(topLeft, player) || checkRightDiagonal(topRight, player) ? true : false);
    }



    const checkWin = (row, column, player) => {
        // check all conditios for winning.
        console.log(`Checking for win for player ${player} at row: ${row}, column: ${column}`);
        console.log(`Board: ${board}, Player: ${player}`)
        if (board[row][column] === player) {
            if (checkVertical(column, player) || checkHorizontal(row, player) || checkDiagonal(row, column, player)) {
                return true;
            }
        }
        else {
            return false;
        }
    }

    const updateBoard = (row, column, player) => {
        board[row][column] = player;
        setBoard(board);
    }

    const handleClick = e => {
        console.log('board clicked!');


        let column = e.target.getAttribute("x");

        if (column === null || currentPlayer === PLAYER_2) {
            return;
        }
        else column = parseInt(column);


        let row = board.findIndex((rowArr, index) => {
            return rowArr[column] !== 0 || (index === board.length - 1)
        });

        if (row !== board.length - 1) row -= 1;
        if (board[row][column] !== 0) row -= 1;

        updateBoard(row, column, currentPlayer);
        setGameOver(checkWin(row, column, currentPlayer));

        if (!gameOver) {
            let newOpp = currentPlayer;
            let newPlayer = (currentPlayer === PLAYER_1) ? PLAYER_2 : PLAYER_1;
            setcurrentPlayer(() => { return newPlayer });
            setopponentPlayer(() => { return newOpp });
            console.log(`Current Player: ${currentPlayer}`);
            console.log(`Opponent Player: ${opponentPlayer}`);
        }
    }


    useEffect(() => {
        if (currentPlayer === PLAYER_2 && !gameOver) {
            setTimeout(() => {
                console.log(`AI's Turn!`);
                let ai = new playerAI(PLAYER_2, AI_DIFFICULTY);
                let aiMove = ai.alphabetapruning(board);
                console.log(`AI's move: ${aiMove}`);
                updateBoard(aiMove[0], aiMove[1], currentPlayer);
                setGameOver(checkWin(aiMove[0], aiMove[1], currentPlayer));
                console.log(gameOver)
                if (!gameOver) {
                    let newOpp = currentPlayer;
                    let newPlayer = (currentPlayer === PLAYER_1) ? PLAYER_2 : PLAYER_1;
                    setcurrentPlayer(() => { return newPlayer });
                    setopponentPlayer(() => { return newOpp });
                    
                }
            }, 1000)
        }
    }, [currentPlayer]);

    const resetGame = () => {

        setBoard(
            [...Array(MAX_HEIGHT)].map(() => { return Array(MAX_WIDTH).fill(DEFAULT_VAL) })
        );
        setGameOver(false);
        setcurrentPlayer(PLAYER_1);
        setopponentPlayer(PLAYER_2);
    }



    return (
        <>
            <Container>
            <Form>
            <br></br>
            <p>Difficulty setting for AI</p>
                
      {['radio'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
          
          <Form.Check 
            onClick={() => 
                {
                    AI_DIFFICULTY = 'easy';
                console.log(AI_DIFFICULTY);
            }
            }
            type={type}
            name="difficulty"
            id={`default-${type}`}
            label={`Small`}
          />

            <Form.Check // prettier-ignore
                type={type}
                onClick={() => 
                    {
                        AI_DIFFICULTY = 'medium';
                        console.log(AI_DIFFICULTY);
                    }
                }
                name="difficulty"
                id={`default-${type}`}
                label={`Medium`}
            />

            <Form.Check // prettier-ignore
                type={type}
                onClick={() => 
                    {
                        AI_DIFFICULTY = 'hard';
                        console.log(AI_DIFFICULTY);}
                }
                name="difficulty"
                id={`default-${type}`}
                label={`Hard`}
            />

        </div>
      ))}
    </Form>
            </Container>
            {gameOver ?
                (<Container>
                    <h1 className="winningTitle" style={{ color: opponentPlayer === PLAYER_1 ? "red" : "black" }} >{opponentPlayer === PLAYER_1 ? "Red" : "Black"} Wins!</h1>
                    <button id="newGameButton" onClick={resetGame}>New game?</button>
                </Container>
                ) :
                (<h2 id="playerMove" className="winningTitle" style={{ color: currentPlayer === PLAYER_1 ? "red" : "black" }}>{currentPlayer === PLAYER_1 ? "Red's " : "Black's"} Move</h2>)}

            <div id="board" onClick={gameOver ? null : handleClick} >
                {board.map((row, i) => {
                    return row.map((player, j) => {
                        return <Slot player={player} y={i} x={j} key={`${j}, ${i}`} />
                    })
                })}
            </div>
        </>
    );
}



export default Board;