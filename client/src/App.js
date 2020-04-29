import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";

function App() {

  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/tag/:tag" component={Home} />
      </Switch>
    </main>
  );
}

export default App;
