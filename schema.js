const mongoose = require("mongoose");

const user = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  country: String,
  email: String,
  password: Strings,
});

const articles = new mongoose.Schema({
  title: String,
  description: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("user", user);
const articles = mongoose.model("Articles", articles);
