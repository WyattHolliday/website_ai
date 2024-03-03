import Container from 'react-bootstrap/Container';
import Slot from './Slot';
import { useState } from 'react';
import { timeout } from 'q';


class playerAI {

    constructor(playerNumber, difficulty) {
        console.log("Constructing AI!");
        this.player = playerNumber;
        this.opponent = playerNumber === 1 ? 2 : 1;
        this.setDifficulty(difficulty);
        this.bestMoves = [];
        this.difficulty = difficulty;
    }

    setDifficulty(difficulty) {
        if (difficulty === "easy") this.depth = 1;
        else if (difficulty === "medium") this.depth = 3;
        else if (difficulty === "hard") this.depth = 5;
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

    // Given a configuration of the board, the AI should make a move.
    // Use a standard minimax algorithm to determine the best move.
    makeMove(board) {
        this.minimax(board, this.depth, true);
        this.setDifficulty(this.difficulty);

        return this.bestMove;
    }

    evaluateWindow(window, player, opponent) {
        let score = 0;
        if (window.filter(x => x === player).length === 4) {
            score += 100;
        } else if (window.filter(x => x === player).length === 3 && window.filter(x => x === 0).length === 1) {
            score += 5;
        } else if (window.filter(x => x === player).length === 2 && window.filter(x => x === 0).length === 2) {
            score += 2;
        }

        if (window.filter(x => x === opponent).length === 3 && window.filter(x => x === 0).length === 1) {
            score -= 4;
        }

        return score;
    }

    moveUtility(board, player) {
        let score = 0;
        let opponent = player === 1 ? 2 : 1;
        // Check for horizontal wins.
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length - 3; j++) {
                let window = board[i].slice(j, j + 4);
                score += this.evaluateWindow(window, player, opponent);
            }
        }

        // Check for vertical wins.
        for (let i = 0; i < board.length - 3; i++) {
            for (let j = 0; j < board[i].length; j++) {
                let window = [board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j]];
                score += this.evaluateWindow(window, player, opponent);
            }
        }

        // Check for diagonal wins.
        for (let i = 0; i < board.length - 3; i++) {
            for (let j = 0; j < board[i].length - 3; j++) {
                let window = [board[i][j], board[i + 1][j + 1], board[i + 2][j + 2], board[i + 3][j + 3]];
                score += this.evaluateWindow(window, player, opponent);
            }
        }

        for (let i = 0; i < board.length - 3; i++) {
            for (let j = 3; j < board[i].length; j++) {
                let window = [board[i][j], board[i + 1][j - 1], board[i + 2][j - 2], board[i + 3][j - 3]];
                score += this.evaluateWindow(window, player, opponent);
            }
        }

        return score;
    }

    minimax(board, depth, isMaximizing) {

        if (depth === 0) {
            // When we've reached max depth, we 
            // return the heuristic value of the board.
            if (isMaximizing)
                return this.moveUtility(board, this.player);
            else
                return this.moveUtility(board, this.opponent);
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            // Get a list of possible moves given the current board.
            // Then call minimax for each state of the board to get the utility.
            let playerMoves = this.getValidMoves(board);
            for (let move = 0; move < playerMoves.length; move++) {
                let row = playerMoves[move][0];
                let col = playerMoves[move][1];
                board[row][col] = this.player;
                let score = this.minimax(board, depth - 1, false);
                board[row][col] = 0;
                if (score > bestScore) {
                    this.bestMove = [row, col];
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;

        } else {
            let bestScore = Infinity;
            let opponentMoves = this.getValidMoves(board);
            for (let move = 0; move < opponentMoves.length; move++) {
                let row = opponentMoves[move][0];
                let col = opponentMoves[move][1];
                board[row][col] = this.opponent;
                let score = this.minimax(board, depth - 1, true);
                board[row][col] = 0;
                if (score < bestScore) {
                    this.bestMove = [row, col];
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
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
    let AI_DIFFICULTY = "easy";

    // const ai = new playerAI(PLAYER_2, AI_DIFFICULTY);



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

        if (column === null) {
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

    /*function aiTurn() {
        setTimeout(() => {
            console.log(`AI's Turn!`);
            let aiMove = ai.makeMove(board);
            console.log(`AI's move: ${aiMove}`);
            updateBoard(aiMove[0], aiMove[1], currentPlayer);
            setGameOver(checkWin(aiMove[0], aiMove[1], currentPlayer));
            let newPlayer = currentPlayer;
            let newOpp = (currentPlayer === PLAYER_1) ? PLAYER_2 : PLAYER_1;
            setcurrentPlayer(() => { return newPlayer });
            setopponentPlayer(() => { return newOpp });
            console.log(`Current Player: ${currentPlayer}`);
        },
            1000)
    }*/

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