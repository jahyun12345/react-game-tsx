import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Route, Switch } from "react-router-dom";

import Main from './Main/Main';
import Test from './Test/Test';
import Gugudan from './Gugudan/Gugudan';
import Ggutmalikki from './Ggutmalikki/Ggutmalikki';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/test" component={Test} />
      <Route exact path="/gugudan" component={Gugudan} />
      <Route exact path="/ggutmalikki" component={Ggutmalikki} />
    </Switch>

  );
}

export default App;
