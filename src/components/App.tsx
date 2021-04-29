import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Route, Switch } from "react-router-dom";

import Main from './views/Main/Main';
import Test from './views/Test/Test';
import Gugudan from './views/Gugudan/Gugudan';
import Ggutmalikki from './views/Ggutmalikki/Ggutmalikki';
import NumberBaseball from './views/NumberBaseball/NumberBaseball';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/test" component={Test} />
      <Route exact path="/gugudan" component={Gugudan} />
      <Route exact path="/ggutmalikki" component={Ggutmalikki} />
      <Route exact path="/numberbaseball" component={NumberBaseball} />
    </Switch>

  );
}

export default App;
