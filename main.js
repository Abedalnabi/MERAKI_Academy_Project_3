const { json } = require("express");
const express = require("express");
const { uuid } = require("uuidv4");
const { User1, Article1 } = require("./schema");
const db = require("./project_3_v01");

//ORR
// const uuid = require("uuidv4");
// console.log(uuid.uuid());

const app = express();
const PORT = 3000;
app.use(express.json());

// const articles = [
//   {
//     id: 1,
//     title: "How I learn coding?",
//     description: "Lorem, Quam, mollitia.",
//     author: "Jouza",
//   },
//   {
//     id: 2,
//     title: "Coding Best Practices",
//     description: "Lorem, ipsum dolor sit, Quam, mollitia.",
//     author: "Besslan",
//   },
//   {
//     id: 3,
//     title: "Debugging",
//     description: "Lorem, Quam, mollitia.",
//     author: "Jouza",
//   },
// ];

app.post("/user", (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;
  //firstName = req.body.FirstName

  const user = new User({
    //firstName:firstName
    firstName,
    lastName,
    age,
    country,
    email,
    password,
  });
  user.save
    .then((result) => {
      res.status(201);
      res.sen(result);
    })
    .catch((err) => {
      res.status(404);
      res.send(err);
    });
});

// const getAllArticles = (req, res, next) => {
//   res.status(200);
//   res.json(articles);
//   next();
// };

// app.get("/articles", getAllArticles);

// const getArticlesByAuthor = (req, res, next) => {
//   let author = req.query.author;
//   const authorArray = articles.filter((ele) => {
//     return ele.author === author;
//   });
//   res.status(200);
//   res.json(authorArray);
//   next();
// };

// app.get("/articles/search_1", getArticlesByAuthor);

// const getAnArticleById = (req, res, next) => {
//   let id = JSON.parse(req.query.id);
//   const idArray = articles.filter((ele) => {
//     return ele.id === id;
//   });
//   res.status(200);
//   res.json(idArray);
//   next();
// };

// app.get("/articles/search_2", getAnArticleById);

// const createNewArticle = (req, res, next) => {
//   let newArticle = req.body;
//   newArticle.id = uuid();
//   articles.push(newArticle);
//   res.status(201);
//   res.json(newArticle);
//   next();
// };

// app.post("/articles", createNewArticle);

// const updateAnArticleById = (req, res, next) => {
//   if (
//     req.body.hasOwnProperty("title") &&
//     req.body.hasOwnProperty("description") &&
//     req.body.hasOwnProperty("author")
//   ) {
//     let id = req.params.id; //Number(id) or JSON.Parse(id)
//     let index;
//     let found = articles.find((ele, i) => {
//       index = i;
//       return Number(id) === ele.id;
//     });
//     if (found) {
//       articles[index] = {
//         id: id, //Or uuid()
//         title: req.body.title,
//         description: req.body.description,
//         author: req.body.author,
//       };
//       res.status(201);
//       res.json(articles[index]);
//       next();
//     } else {
//       res.status(404);
//       res.json("Wrong ID");
//       next();
//     }
//   } else {
//     res.status(404);
//     res.json("Wrong entry");
//     next();
//   }
// };

// app.put("/articles/:id", updateAnArticleById);

// const deleteArticleById = (req, res, next) => {
//   let id = req.params.id; // Number or Jason.parse
//   let index;
//   let found = articles.find((ele, i) => {
//     index = i;
//     return Number(id) === ele.id;
//   });
//   if (found) {
//     articles.splice(index, 1);
//     res.status(410);
//     res.json({
//       success: true,
//       message: `Success Delete article with id => ${id}`,
//     });
//     next();
//   } else {
//     res.status(404);
//     res.json("Wrong ID");
//     next();
//   }
// };

// app.delete("/articles/:id", deleteArticleById);

// const deleteArticlesByAuthor = (req, res, next) => {
//   let deleteAuthor = req.body.author;
//   ///OR USE : filter that include the array and return ele.author != deleteAuthor;
//   const found = articles.find((ele, i) => {
//     return deleteAuthor === ele.author;
//   });
//   if (found) {
//     // USE filter : articles = found
//     let obj = {};
//     for (let i = 0; i < articles.length; i++) {
//       if (deleteAuthor === articles[i].author) {
//         articles.splice(i, 1);
//         i--;
//         obj.success = true;
//         obj.message = ` Success delete all the articles for the author => ${deleteAuthor}`;
//       }
//     }
//     res.status(410);
//     res.json(obj);
//     next();
//   } else {
//     res.status(404);
//     res.json("No author have this name");
//   }
// };

// app.delete("/articles", deleteArticlesByAuthor);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
