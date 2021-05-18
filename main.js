const { json } = require("express");
const express = require("express");
const { uuid } = require("uuidv4");
const { Users, articles } = require("./schema");
// const a = require("./schema");
// const b = require("./schema");
//this is same above User2 a.User2
// console.log(a.User2)
// console.log(b.User2)

const db = require("./db");

const app = express();
const PORT = 5000;
app.use(express.json());

app.post("/users", (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;
  const newUser = new Users({
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
const createNewArticle = async (req, res, next) => {
  const newArticle = ({ title, description, author } = req.body);

  newArtical1
    .save()
    .then((rsl) => {
      res.status(201);
      res.json(rsl);
      next();
    })
    .catch((err) => {
      res.send(err);
      next();
    });
};

app.post("/articles", createNewArticle);

const getAllArticles = async (req, res, next) => {
  articles;
  let a = await articles
    .find()
    .then((rsl) => {
      res.json(rsl);
    })
    .catch((err) => {
      res.send(err);
    });
  //OR async await
  //     let a = await articles.find();
  //     res.json(a);
};
app.get("/articles", getAllArticles);

const getArticlesByAuthor = async (req, res, next) => {
  const author = req.query.author;
  const articlesByAuthor = await articles.findOne({ author: author });
  res.status(200);
  res.json(articlesByAuthor).catch((err) => {
    res.status(404);
    res.send(err);
    console.log("DDq");
  });
};
app.get("/articles/search_1", getArticlesByAuthor);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
