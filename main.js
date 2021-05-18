const { json } = require("express");
const express = require("express");
const { uuid } = require("uuidv4");
const { User, Article } = require("./schema");
console.log(User);
const db = require("./db");
const app = express();
const PORT = 5000;
app.use(express.json());

app.post("/users", (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
