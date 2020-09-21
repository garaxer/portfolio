import React, { useState, useEffect, ChangeEvent } from "react";
import Grid from "./Grid";
import "./GridGame.css";

import { Plane, Pos } from "./Types";

const makeGrid = (n: number): Plane => Array(n).fill(Array(n).fill(false));

const BASE_GRID_SIZE = 3;

const pressDiagonals = ([x, y]: Pos) => (grid: Plane) =>
  grid.map((r, rx) =>
    Math.abs(rx - x) > 1
      ? r
      : r.map((c, cy) => {
          const xabs = Math.abs(rx - x);
          const yabs = Math.abs(cy - y);
          const delta = xabs + yabs;
          console.log(yabs);

          return (yabs < 2 && delta === 2) || (rx === x && cy === y) ? !c : c;
        })
  );

const pressSqaure = ([x, y]: Pos) => (grid: Plane) =>
  grid.map((r, rx) =>
    Math.abs(rx - x) > 1
      ? r
      : r.map((c, cy) => (Math.abs(rx - x) + Math.abs(cy - y) <= 1 ? !c : c))
  );

type pressPaterns = "square" | "diagonal";

const press = (patternType: pressPaterns) => {
  const patternMap = {
    square: pressSqaure,
    diagonal: pressDiagonals,
  };
  return patternMap[patternType];
};

const GridGame = () => {
  document.title = "Idempotency's Grid";

  const [presses, setPresses] = useState(0);
  const [grid, setGrid] = useState(makeGrid(BASE_GRID_SIZE));
  const [patternType, setPatternType] = useState<pressPaterns>("diagonal");

  useEffect(() => {
    const upHandler = ({ key }: { key: string }) => {
      if (key === "s") setGrid(grid.map(r => r.map(() => true)));
    };
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keyup", upHandler);
    };
  }, [grid]);

  const isComplete = grid.flat().every(x => x);

  const handleSquareClick = ([rx, ry]: Pos) => () => {
    if (!isComplete) {
      setPresses(presses + 1);
      setGrid(press(patternType)([rx, ry])(grid));
    }
  };

  const handleNextClick = () => {
    setGrid(makeGrid(grid.length + 1));
    setPresses(0);
  };

  const handleOptionChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    //TODO: Find out how to do this.
    if (value === "square" || value === "diagonal") {
      setPatternType(value);
    }
  };

  const RadioButtons = () => (
    <div className='pattern-radio'>
      <input
        type='radio'
        value='square'
        checked={patternType === "square"}
        onChange={handleOptionChange}
      />
      <label htmlFor='square'>Square</label>
      <input
        type='radio'
        value='diagonal'
        checked={patternType === "diagonal"}
        onChange={handleOptionChange}
      />
      <label htmlFor='diagonal'>Diagonal</label>
    </div>
  );

  return (
    <div className='game-container'>
      <header>Idempotency&apos;s Grid</header>
      <RadioButtons />
      <div className='game'>
        <div className='squares'>
          <Grid
            grid={grid}
            isComplete={isComplete}
            onPress={handleSquareClick}
          />
        </div>

        {isComplete && (
          <div className='win-text'>
            <div className='win'>Completed in {presses} presses.</div>
            <button onClick={handleNextClick}>
              Next - {grid.length + 1} by {grid.length + 1}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GridGame;
