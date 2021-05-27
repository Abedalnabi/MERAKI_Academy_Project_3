import React, { useState } from "react";
import "./App.css";
import Register from "./components/Register";
import Navigation from "./components/Navigation";
import Login from "./components/Login";

import { Link, Route, useHistory } from "react-router-dom";

import axios from "axios";

export default function App() {
  return (
    <div>
      <Navigation />
      <Route path="/Register" component={Register} />
      <Route path="/login" component={Login} />
    </div>
  );
}
