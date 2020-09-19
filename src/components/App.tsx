import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "./landing/Landing";
import GridGame from "./grid/GridGame";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/gridgame'>
          <GridGame />
        </Route>

        <Route path='/'>
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
