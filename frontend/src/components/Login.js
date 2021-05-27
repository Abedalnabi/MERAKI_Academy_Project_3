import React, { useState } from "react";
import axios from "axios";
import { Link, Route, useHistory } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./Dashboard";
import Navigation from "./Navigation";

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const [state, setState] = useState(true);
  const [state1, setState1] = useState(true);

  const checkEmailAndPassword = () => {
    const emailAndPasswprd = { email: email, password: password };

    axios
      .post("http://localhost:5000/login", emailAndPasswprd)
      .then((res) => {
        console.log(res.data);
        setState(false);
        setState1(true);
      })
      .catch((err) => {
        console.log(err);
        setState1(false);
        setState(true);
      });
  };
  return (
    <div>
      <Navigation />
      <input
        type="text"
        placeholder="Email here"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <br></br>
      <input
        type="text"
        placeholder="Password here"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <br></br>
      <button onClick={checkEmailAndPassword}>Login</button>
      {state ? <p></p> : history.push("/Dashboard")}
      {state1 ? <p></p> : <p>password Or email uncorrect</p>}
    </div>
  );
}
