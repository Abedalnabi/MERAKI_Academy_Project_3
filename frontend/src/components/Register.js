import React from "react";
import { Link, Route, useHistory } from "react-router-dom";

export default function Register() {
  return (
    <div>
      <p>Rester</p>
      <input type="text" placeholder="firstName here"></input>
      <br></br>
      <input type="text" placeholder="lastName here"></input>
      <br></br>
      <input type="text" placeholder="age here."></input>
      <br></br>
      <input type="text" placeholder="country here"></input>
      <br></br>
      <input type="text" placeholder=" lastName here"></input>
      <br></br>
      <input type="text" placeholder=" email here"></input>
      <br></br>
      <input type="text" placeholder=" password here"></input>
      <br></br>

      <button onClick={(e) => {}}>Rester</button>
    </div>
  );
}
