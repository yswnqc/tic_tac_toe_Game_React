import "./App.css";
import React from "react";

function App() {
  const size = 3;
  const initboard = Array.from({ length: size }, () => Array(size).fill(""));
  const [player, setPlayer] = React.useState("X");
  const [board, setBoard] = React.useState(initboard);
  const [win, setWin] = React.useState("");
  const [winTiles, setWinTiles] = React.useState([]);
  const [countX, setCountX] = React.useState(
    localStorage.getItem("count X wins") || 0
  );
  const [countO, setCountO] = React.useState(
    localStorage.getItem("count O wins") || 0
  );
  const handleClick = (x, y) => {
    let newBoard = board;
    newBoard[x][y] = player;
    setBoard(newBoard);
    checkWin(player);
    setPlayer(player === "X" ? "O" : "X");
  };

  const checkWin = (player) => {
    const count = board.flat().filter((cell) => cell === "").length;
    if (!count && !win) {
      setWin("Draw");
    }
    const winConditions = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];
    winConditions.forEach((condition) => {
      if (
        board[condition[0][0]][condition[0][1]] === player &&
        board[condition[1][0]][condition[1][1]] === player &&
        board[condition[2][0]][condition[2][1]] === player
      ) {
        setWin(player);
        setWinTiles(condition);
        const newCount = player === "X" ? +countX + 1 : +countO + 1;
        localStorage.setItem(`count ${player} wins`, newCount);
        player === "X" ? setCountX(newCount) : setCountO(newCount);
      }
    });
  };
  const colorTile = (x, y) => {
    let label = "";
    winTiles?.forEach((tile) => {
      if (x === tile[0] && y === tile[1]) {
        label = "win";
      }
    });
    return label;
  };
  const resetGame = () => {
    setPlayer("X");
    setBoard(initboard);
    setWin("");
    setWinTiles([]);
    setCountX(localStorage.getItem("count X wins") || 0);
    setCountO(localStorage.getItem("count O wins") || 0);
  };
  return (
    <div className="App">
      <h1>Tic Tac Toe Game</h1>
      {board.map((col, x) => (
        <div key={x} className="row">
          {col.map((cell, y) => (
            <button
              key={y}
              onClick={() => handleClick(x, y)}
              disabled={board[x][y] || win}
              className={win ? colorTile(x, y) : null}
            >
              {cell}
            </button>
          ))}
        </div>
      ))}

      <div className="count">
        <p>
          Count X Wins: {countX}
          <br />
          Count O Wins: {countO}
        </p>
        {!win ? (
          <h2>Current Player: {player}</h2>
        ) : win === "Draw" ? (
          <h2>🤝 Draw!</h2>
        ) : (
          <h2>👑 Winner: {win}</h2>
        )}
        <button
          className="reset"
          onClick={() => {
            localStorage.clear();
            resetGame();
          }}
        >
          Reset Count
        </button>
        <button className="reset" onClick={() => resetGame()}>
          Restart Game
        </button>
      </div>
    </div>
  );
}

export default App;
