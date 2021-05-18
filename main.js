const { json } = require("express");
const express = require("express");
const { uuid } = require("uuidv4");
const { Users, articles, Comments } = require("./schema");
// const a = require("./schema");
// const b = require("./schema");
//this is same above User2 a.User2
// console.log(a.User2)
// console.log(b.User2)

const db = require("./db");

const app = express();
const PORT = 5000;
app.use(express.json());

//createNewAuthor

const createNewAuthor = (req, res) => {
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
};

app.post("/users", createNewAuthor);

const createNewArticle = async (req, res) => {
  const newArticle = ({ title, description, author } = req.body);
  newArticle
    .save()
    .then((rsl) => {
      res.status(201);
      res.json(rsl);
    })
    .catch((err) => {
      res.status(404);
      res.send(err);
    });
};

app.post("/articles", createNewArticle);

////getAllArticles

const getAllArticles = async (req, res, next) => {
  res.status(200);
  res.json(await articles.find());
};
app.get("/articles", getAllArticles);

//getArticlesByAuthor

const getArticlesByAuthor = async (req, res, next) => {
  const author = req.query.author;
  let ID;
  await Users.find({ firstName: author })
    .then((rel) => {
      ID = rel[0]._id;
    })
    .catch((err) => {
      res.status(404);
      res.send(err);
    });
  res.status(200);
  res.json(await articles.find({ author: ID })).catch((err) => {
    res.status(404);
    res.send(err);
  });
};

app.get("/articles/search_1", getArticlesByAuthor);

// getAnArticleById

const getAnArticleById = async (req, res) => {
  const id = req.body.id;
  await articles
    .find({ author: id })
    .populate("author", "firstName lastName age country")
    .exec()
    .then((rsl) => {
      res.status(200);
      res.json(rsl);
    })
    .catch((err) => {
      es.status(404);
      res.json(err);
    });
};

app.get("/articles/search_2", getAnArticleById);

// updateAnArticleById

const updateAnArticleById = async (req, res) => {
  if (
    req.body.hasOwnProperty("title") &&
    req.body.hasOwnProperty("description")
  ) {
    const id = req.params.id;
    updated = req.body;
    await articles.findOneAndUpdate({ _id: id }, { updated });
    res.status(200);
    res.json("done Updated");
  } else {
    res.status(404);
    res.json("Wrong entry");
  }
};

app.put("/articles/:id", updateAnArticleById);

// deleteArticleById

const deleteArticleById = async (req, res) => {
  const id = req.params.id;
  await articles.findOneAndDelete({ _id: id });
  res.status(200);
  res.json("Done Delete");
};
app.delete("/articles/:id", deleteArticleById);

// deleteArticlesByAuthor

const deleteArticlesByAuthor = async (req, res, next) => {
  const author = req.body.author;
  let ID;
  await Users.find({ firstName: author })
    .then((rel) => {
      ID = rel[0]._id;
    })
    .catch((err) => {
      res.status(404);
      res.send(err);
    });
  await articles.findOneAndDelete({ author: ID });
  res.status(200);
  res.json("Done Delete");
};

app.delete("/articles", deleteArticlesByAuthor);

const login = async (req, res) => {
  const { email, password } = req.body;
  await Users.findOne({ email: email, password: password }).then((rsl) => {
    console.log(rsl);
    if (rsl) {
      res.status(200);
      res.json("Valid login credentials");
    } else {
      res.status(401);
      res.json("Invalid login credentials");
    }
  });
};

app.post("/login", login);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
