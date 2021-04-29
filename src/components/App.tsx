import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Route, Switch } from "react-router-dom";

import Main from './Main';
import Test from './Test';
import Gugudan from './Gugudan';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/test" component={Test} />
      <Route exact path="/gugudan" component={Gugudan} />
    </Switch>

  );
}

export default App;
