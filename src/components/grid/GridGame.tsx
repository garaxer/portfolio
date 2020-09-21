import React, { useState } from "react";

import "./GridGame.css";

const initialGrid = [
  [false, false, false],
  [false, false, false],
  [false, false, false],
];

const press = ([x, y]: number[]) => (grid: boolean[][]) =>
  grid.map((r, rx) =>
    Math.abs(rx - x) > 1
      ? r
      : r.map((c, cy) => (Math.abs(rx - x) + Math.abs(cy - y) <= 1 ? !c : c))
  );

const GridGame = () => {
  document.title = "The Grid";

  const [grid, setGrid] = useState(initialGrid);
  const [won, setWon] = useState(false);
  const [gridSize, setGridSize] = useState(3); // 3 is the initial grid size
  const [presses, setPresses] = useState(0);

  const handleSquareClick = ([rx, ry]: number[]) => () => {
    if (won) {
      return;
    }

    setPresses(presses + 1);
    const newGrid = press([rx, ry])(grid);
    setGrid(newGrid);

    const didWin = newGrid.every(x => x.every(x => x));
    console.log(didWin);

    if (didWin) {
      setGridSize(gridSize + 1);
      setWon(true);
    }
  };

  const gridIcon = ([rx, ry]: number[]) => (value: boolean) => {
    return (
      <div
        className={`square ${value ? "square-clicked" : ""} ${
          won ? "won" : ""
        }`}
        key={`${rx}${ry}`}
        onClick={handleSquareClick([rx, ry])}
      ></div>
    );
  };

  const handleNextClick = () => {
    setWon(false);
    const arr = new Array(gridSize).fill(false);
    const newGrid = arr.map(() => [...arr]);
    setGrid(newGrid);
  };

  return (
    <div className='game-container'>
      <header>The Grid</header>
      <div className='game'>
        <div className='squares'>
          {grid.map((x, rx) => (
            <div key={`${rx}`} className='row'>
              {x.map((y, ry) => gridIcon([rx, ry])(y))}
            </div>
          ))}
        </div>

        {won && (
          <div className='win-text'>
            <div className='win'> Completed in {presses} presses.</div>
            <button onClick={handleNextClick}>
              Next - {gridSize} by {gridSize}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GridGame;
