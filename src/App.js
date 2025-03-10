import React, { useState } from 'react';
import './App.css';

const BOARD_SIZE = 12;
const WIN_LENGTH = 5;

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(row, col) {
    if (squares[row][col] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.map((row) => [...row]);
    nextSquares[row][col] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((_, colIndex) => (
              <Square
                key={colIndex}
                value={squares[rowIndex][colIndex]}
                onSquareClick={() => handleClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([
    Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null)),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function resetGame() {
    setHistory([
      Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(null)),
    ]);
    setCurrentMove(0);
  }

  const winner = calculateWinner(currentSquares);

  return (
    <div className="game-container">
      <h1 className="game-title">Happy Caro</h1>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
      </div>
      <div className="game-info">
        {winner && (
          <div>
            <p>Winner: {winner}</p>
          </div>
        )}
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const size = squares.length;

  // Check horizontal, vertical, and diagonal
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!squares[row][col]) continue;

      // Check horizontal
      if (col <= size - WIN_LENGTH) {
        let win = true;
        for (let i = 1; i < WIN_LENGTH; i++) {
          if (squares[row][col] !== squares[row][col + i]) {
            win = false;
            break;
          }
        }
        if (win) return squares[row][col];
      }

      // Check vertical
      if (row <= size - WIN_LENGTH) {
        let win = true;
        for (let i = 1; i < WIN_LENGTH; i++) {
          if (squares[row][col] !== squares[row + i][col]) {
            win = false;
            break;
          }
        }
        if (win) return squares[row][col];
      }

      // Check diagonal (top-left to bottom-right)
      if (row <= size - WIN_LENGTH && col <= size - WIN_LENGTH) {
        let win = true;
        for (let i = 1; i < WIN_LENGTH; i++) {
          if (squares[row][col] !== squares[row + i][col + i]) {
            win = false;
            break;
          }
        }
        if (win) return squares[row][col];
      }

      // Check diagonal (top-right to bottom-left)
      if (row <= size - WIN_LENGTH && col >= WIN_LENGTH - 1) {
        let win = true;
        for (let i = 1; i < WIN_LENGTH; i++) {
          if (squares[row][col] !== squares[row + i][col - i]) {
            win = false;
            break;
          }
        }
        if (win) return squares[row][col];
      }
    }
  }

  return null;
}
