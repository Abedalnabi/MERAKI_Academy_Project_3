const mongoose = require("mongoose");

const user = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  country: String,
  email: String,
  Password: String,
});

const articles = new mongoose.Schema({
  title: String,
  description: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User1 = mongoose.model("user", user);
const articles1 = mongoose.model("Article", articles);

module.exports.user = User1;
module.exports.Article = articles1;
