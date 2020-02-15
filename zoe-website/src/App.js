import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Nav from "./components/Nav";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />

        <Route exact path="/login" component={Login} />

        <Route exact path="/signup" component={Signup} />

        <Route exact path="/home" component={Home} />

        <Route exact path="/" />

      </div>
    </Router>
  );
}

export default App;
