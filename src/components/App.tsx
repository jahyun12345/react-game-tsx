import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Route, Switch } from "react-router-dom";

import Main from './views/Main/Main';
import Test from './views/Test/Test';
import Gugudan from './views/Gugudan/Gugudan';
import Ggutmalikki from './views/Ggutmalikki/Ggutmalikki';
import NumberBaseball from './views/NumberBaseball/NumberBaseball';
import Responsecheck from './views/Responsecheck/Responsecheck';
import RSP from './views/RSP/RSP';
import Lottery from './views/Lottery/Lottery';
import Tiktaktoe from './views/Tiktaltoe/Tiktaktoe';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/test" component={Test} />
      <Route exact path="/gugudan" component={Gugudan} />
      <Route exact path="/ggutmalikki" component={Ggutmalikki} />
      <Route exact path="/numberbaseball" component={NumberBaseball} />
      <Route exact path="/responsecheck" component={Responsecheck} />
      <Route exact path="/rsp" component={RSP} />
      <Route exact path="/lottery" component={Lottery} />
      <Route exact path="/tiktaktoe" component={Tiktaktoe} />
    </Switch>
  );
}

export default App;
