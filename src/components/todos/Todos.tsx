import React, { useReducer, useState } from "react";
import "./Todos.css";

type Todo = {
  id: number;
  title: string;
  column: string;
};

type TodoAction =
  | { type: "ADD_TODO"; todo: Omit<Todo, "id"> }
  | { type: "DELETE_TODO"; id: number }
  | { type: "MOVE_TODO"; column: string; id: number };

const initialTodos = [
  {
    id: 1,
    title: "Todo 1",
    column: "todo",
  },
  {
    id: 2,
    title: "Todo 2",
    column: "done",
  },
];
let nextId = 2;
const reducer = (state: Todo[], action: TodoAction) => {
  switch (action.type) {
    case "MOVE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, column: action.column } : todo
      );
    case "ADD_TODO":
      nextId = nextId + 1;
      return [...state, { ...action.todo, id: nextId }];
    default:
      return state;
  }
};

const Todos = () => {
  const [todos, dispatchTodo] = useReducer(reducer, initialTodos);
  const [columns, dispatchColumns] = useReducer(
    (s: { [k: string]: string }, a: { [k: string]: string }) => ({
      ...s,
      ...a,
    }),
    { todo: "", done: "" }
  );
  const [newColumn, setNewColumn] = useState("");
  return (
    <div className="todos-container">
      {Object.entries(columns).map(([column, value]) => (
        <div className="todos-column" id={column}>
          <h4 className="todos-columnHeader">{column}</h4>
          <div className="todos-wrapper">
            {todos
              .filter((todo) => todo.column === column)
              .map((todo) => (
                <li className="todos-todo" id={todo.id.toString()}>
                  {todo.title}
                </li>
              ))}
          </div>
          <input
            value={value}
            onChange={(e) => dispatchColumns({ [column]: e.target.value })}
            type={"text"}
          />
          <button
            onClick={() => {
              dispatchTodo({
                type: "ADD_TODO",
                todo: { column, title: value },
              });
              dispatchColumns({ [column]: "" });
            }}
          >
            Add todo
          </button>
        </div>
      ))}
      <div className="newColumn">
        <input
          value={newColumn}
          onChange={(e) => setNewColumn(e.target.value)}
          type={"text"}
        />
        <button onClick={() => dispatchColumns({ [newColumn]: "" })}>
          Add column
        </button>
      </div>
    </div>
  );
};

export default Todos;
