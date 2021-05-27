import React, { useState } from "react";
import "./App.css";
import Register from "./components/Register";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import { Link, Route, useHistory, Switch } from "react-router-dom";

import axios from "axios";

export default function App() {
  return (
    <div>
      <Route exact path="/Dashboard" component={Dashboard} />
      <Route exact path="/" component={Navigation} />
      <Route path="/Register" component={Register} />
      <Route path="/login" component={Login} />
    </div>
  );
}
