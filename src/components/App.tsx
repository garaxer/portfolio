import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./landing/Landing";
import GridGame from "./grid/GridGame";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/gridgame" element={<GridGame />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
