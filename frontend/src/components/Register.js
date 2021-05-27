import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route, useHistory } from "react-router-dom";

export default function Register() {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [register1, setRegister1] = useState(false);

  const addUser = () => {
    const newUser = { firstName: firstName, lastName: lastName, age: age, country: country, email: email, password: password };
    axios
      .post(`http://localhost:5000/users`, newUser)
      .then((res) => {
        console.log(res);
        if (res.data._id) {
          console.log("yes");
          console.log(res);
          setRegister(true);
          setRegister1(false);
        } else {
          console.log("Noo");
          setRegister(false);
          setRegister1(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <p>Register</p>
      <input
        type="text"
        placeholder="firstName here"
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      ></input>
      <br></br>
      <input
        type="text"
        placeholder="lastName here"
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      ></input>
      <br></br>
      <input
        type="text"
        placeholder="age here."
        onChange={(e) => {
          setAge(e.target.value);
        }}
      ></input>
      <br></br>
      <input
        type="text"
        placeholder="country here"
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      ></input>
      <br></br>
      <input
        type="text"
        placeholder=" email here"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <br></br>
      <input
        type="text"
        placeholder=" password here"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <br></br>

      <button onClick={addUser}>Register</button>

      {register ? <div>The user has been created successfully</div> : <div></div>}
      {register1 ? <div>Error happened while register, please try again</div> : <div></div>}
    </div>
  );
}
