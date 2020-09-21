import React from "react";
import styled, { css } from "styled-components";

import { Plane, Pos } from "./Types";

type Id = {
  idx: Number;
};

type CellProps = Id & {
  active: boolean;
  isComplete: boolean;
};

type GridProps = {
  grid: Plane;
  isComplete: boolean;
  onPress: (p: Pos) => () => void;
};

//  margin-top: ${({ idx }) => idx && "1rem"};

const Row = styled.div`
  display: flex;
  &:not(:first-child) {
    margin-top: 1rem;
  }
`;

const hoverStyle = css<CellProps>`
  :hover {
    cursor: pointer;
    background: ${({ active }) => (active ? "#F9E747" : "#C3C1B1")};
  }
`;

const activeStyle = css`
  background: #ffeb3b;
  box-shadow: inset 0 0 0.4rem #777;
  transform: translateY(0.4rem);
`;

const pressStyle = css`
  :active {
    ${activeStyle};
    background: #f9e747;
    box-shadow: inset 0 0.1rem 0.4rem #777;
  }
`;

const Cell = styled.div<CellProps>`
  width: 5rem;
  height: 5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.4rem #777;
  background: #bdbdbd;
  margin-left: ${({ idx }) => idx && "1rem"};
  ${({ active }) => active && activeStyle}
  ${({ isComplete }) => !isComplete && hoverStyle}
  ${({ isComplete }) =>
    !isComplete && pressStyle}
`;

const Grid = ({ grid, isComplete, onPress }: GridProps) => {
  const gridIcon = ([ri, ci]: Pos) => (value: boolean) => {
    return (
      <Cell
        key={`${ri}${ci}`}
        onClick={onPress([ri, ci])}
        active={value}
        idx={ci}
        isComplete={isComplete}
      ></Cell>
    );
  };

  return (
    <>
      {grid.map((row, ri) => (
        <Row key={ri}>
          {row.map((cell: boolean, ci: number) => gridIcon([ri, ci])(cell))}
        </Row>
      ))}
    </>
  );
};

export default Grid;
