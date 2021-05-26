import React from "react";
import "./App.css";
import Register from "./components/Register";
import Navigation from "./components/Navigation";
import { Link, Route, useHistory } from "react-router-dom";
export default function App() {
  return (
    <div>
      <Navigation />
      <Register path="/register" component={Register} />
    </div>
  );
}
