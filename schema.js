const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
});

const articlesSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.ObjectId, ref: "User" },
});

const users1 = mongoose.model("User", usersSchema);
const articles1 = mongoose.model("Article", articlesSchema);

module.exports.User = users1;
module.exports.Article = articles1;
