import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./landing/Landing";
import GridGame from "./grid/GridGame";
import Todos from "./todos/Todos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/todos" element={<Todos />} />
        <Route path="/gridgame" element={<GridGame />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
