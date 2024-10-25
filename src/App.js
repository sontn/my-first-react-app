import React, { useState } from 'react';
import './App.css';

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
    Array(30)
      .fill(null)
      .map(() => Array(30).fill(null)),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetGame() {
    setHistory([
      Array(30)
        .fill(null)
        .map(() => Array(30).fill(null)),
    ]);
    setCurrentMove(0);
  }

  const moves = history.map((_, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

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
        <div className="game-info">
          {winner && (
            <div>
              <p>Winner: {winner}</p>
              <button className="reset-button" onClick={resetGame}>
                Reset Game
              </button>
            </div>
          )}
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const size = squares.length;
  const winLength = 5;

  // Check horizontal, vertical, and diagonal
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!squares[row][col]) continue;

      // Check horizontal
      if (col <= size - winLength) {
        let win = true;
        for (let i = 1; i < winLength; i++) {
          if (squares[row][col] !== squares[row][col + i]) {
            win = false;
            break;
          }
        }
        if (win) return squares[row][col];
      }

      // Check vertical
      if (row <= size - winLength) {
        let win = true;
        for (let i = 1; i < winLength; i++) {
          if (squares[row][col] !== squares[row + i][col]) {
            win = false;
            break;
          }
        }
        if (win) return squares[row][col];
      }

      // Check diagonal (top-left to bottom-right)
      if (row <= size - winLength && col <= size - winLength) {
        let win = true;
        for (let i = 1; i < winLength; i++) {
          if (squares[row][col] !== squares[row + i][col + i]) {
            win = false;
            break;
          }
        }
        if (win) return squares[row][col];
      }

      // Check diagonal (top-right to bottom-left)
      if (row <= size - winLength && col >= winLength - 1) {
        let win = true;
        for (let i = 1; i < winLength; i++) {
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
