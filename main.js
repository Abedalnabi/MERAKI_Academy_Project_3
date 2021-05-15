const { json } = require("express");
const express = require("express");
const { uuid } = require("uuidv4");

const app = express();
const PORT = 5000;

app.use(express.json());

const articles = [
  {
    id: 1,
    title: "How I learn coding?",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
  {
    id: 2,
    title: "Coding Best Practices",
    description: "Lorem, ipsum dolor sit, Quam, mollitia.",
    author: "Besslan",
  },
  {
    id: 3,
    title: "Debugging",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
];
const getAllArticles = (req, res, next) => {
  res.status(200);
  res.json(articles);
  next();
};

app.get("/articles", getAllArticles);

const getArticlesByAuthor = (req, res, next) => {
  let author = req.query.author;
  const authorArray = articles.filter((ele) => {
    return ele.author === author;
  });
  res.status(200);
  res.json(authorArray);
  next();
};

app.get("/articles/search_1", getArticlesByAuthor);

const getAnArticleById = (req, res, next) => {
  let id = JSON.parse(req.query.id);
  const idArray = articles.filter((ele) => {
    return ele.id === id;
  });
  res.status(200);
  res.json(idArray);
  next();
};

app.get("/articles/search_2", getAnArticleById);

const createNewArticle = (req, res, next) => {
  let newArticle = req.body;
  newArticle.id = uuid();
  articles.push(newArticle);
  res.status(201);
  res.json(newArticle);
};

app.post("/articles", createNewArticle);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
