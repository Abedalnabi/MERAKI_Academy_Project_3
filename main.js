const express = require("express");
const app = express();
const PORT = 5000;

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

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
