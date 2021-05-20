const { json } = require("express");
const express = require("express");
const { uuid } = require("uuidv4");
const { Users, articles, Comments, Roles } = require("./schema");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const a = require("./schema");
// const b = require("./schema");
//this is same above User2 a.User2
// console.log(a.User2)
// console.log(b.User2)

const db = require("./db");

const app = express();
const PORT = process.env.DB_URI;

app.use(express.json());

//createNewAuthor

const createNewAuthor = (req, res) => {
  const { firstName, lastName, age, country, email, password, role } = req.body;
  const newUser = new Users({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    role,
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

const createNewArticle = (req, res) => {
  const { title, description, author } = req.body;
  const newArticle = new articles({ title, description, author });
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

const getAllArticles = async (req, res) => {
  res.status(200);
  res.json(await articles.find()).exec();
};
app.get("/articles", getAllArticles);

//getArticlesByAuthor

const getArticlesByAuthor = async (req, res) => {
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
    .find({ _id: id })
    .populate("author", "firstName")
    .exec()
    .then((rsl) => {
      res.status(200);
      res.json(rsl);
    })
    .catch((err) => {
      res.status(404);
      res.json(err);
    });
};

app.get("/articles/search_2", getAnArticleById);

// updateAnArticleById

const updateAnArticleById = async (req, res) => {
  if (req.body.hasOwnProperty("title") && req.body.hasOwnProperty("description")) {
    const id = req.params.id;
    update = req.body;
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

const deleteArticlesByAuthor = async (req, res) => {
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

// login

const login = async (req, res) => {
  const { email, password } = req.body;

  informationForUser = await Users.findOne({ email: email }, "password country role");
  const role = await Roles.findOne({ _id: informationForUser.role });
  if (informationForUser) {
    bcrypt.compare(password, informationForUser.password, (err, rsl) => {
      if (rsl) {
        const payload = {
          userId: informationForUser._id,
          country: informationForUser.country,
          role: role,
        };
        const options = { expiresIn: "60m" };
        secret = process.env.SECRET;
        res.status(200);
        res.json(jwt.sign(payload, secret, options));
      } else {
        const err = new Error("the password you,ve entered is incorrect");
        err.status = 403;
        res.status(403);
        res.json({
          massage: err.massage,
          status: err.status,
        });
      }
    });
  } else {
    const err = new Error("the email doesn't exist");
    err.status = 404;
    res.status(404);
    res.json({
      massage: err.message,
      status: err.status,
    });
  }
};

app.post("/login", login);

// roles

const rolesFun = async (req, res) => {
  const { role, permissions } = req.body;
  const roles = await new Roles({ role, permissions });
  roles
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

app.post("/roles", rolesFun);

// createNewComment && authentication &&authorization

const authorization = async function (string) {
  let token = req.headers.authorization.split(" ")[1];
  const secret = process.env.SECRET;
  let permissions = token.permissions;

  if (permissions === string) {
    return function (req, res, next) {
      jwt.verify(token, secret, (err, rsl) => {
        if (rsl) {
          token = rsl;
          console.log(token);
          next();
        }
        if (err) {
          const err = new Error("the token is invalid or expired");
          err.status = 403;
          res.status(403);
          res.json({
            massage: err.message,
            status: err.status,
          });
        }
      });
    };
  } else {
    res.status(403);
    res.json({ massage: "Not macthes" });
  }
};

/*
const authentication = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  const secret = process.env.SECRET;
  jwt.verify(token, secret, (err, rsl) => {
    if (rsl) {
      token = rsl;
      console.log(token);
      next();
    }
    if (err) {
      const err = new Error("the token is invalid or expired");
      err.status = 403;
      res.status(403);
      res.json({
        massage: err.message,
        status: err.status,
      });
    }
  });
};

/////

const authorization = async function (string) {
  let permissions = token.permissions;

  return function (req, res, next) {
    if (permissions === string) {
      next();
    } else {
      res.status(403);
      res.json({ massage: "Not macthes" });
    }
  };
};
*/
const createNewComment = (req, res) => {
  const idFoArticle = req.params;
  const { comment, commenter } = req.body;
  let ID;
  const newComments = new Comments({
    comment,
    commenter,
  });
  newComments
    .save()
    .then((rsl) => {
      res.status(201);
      res.json(rsl);
      ID = rsl._id;
      articles.findOneAndUpdate({ _id: idFoArticle }, { $push: { comments: ID } }).exec();
    })
    .catch((err) => {
      res.status(404);
      res.send(err);
    });
};

app.post("/articles/:id/comments", authorization, createNewComment);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
