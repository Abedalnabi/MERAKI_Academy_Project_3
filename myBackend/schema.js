const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  role: { type: mongoose.Schema.ObjectId, ref: "Roles" },
});

const articlesSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.ObjectId, ref: "Users" },
  comments: [{ type: mongoose.Schema.ObjectId, ref: "Comments" }],
});

const commentsSchema = new mongoose.Schema({
  comment: { type: String },
  commenter: { type: mongoose.Schema.ObjectId, ref: "Users" },
});

const rolesSchema = new mongoose.Schema({
  role: { type: String },
  permissions: [{ type: String }],
});

//////////////////////////

usersSchema.pre("save", async function () {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.email = this.email.toLowerCase();
  this.password = hashedPassword;
});

const Users = mongoose.model("Users", usersSchema);
const articles = mongoose.model("articles", articlesSchema);
const Comments = mongoose.model("Comments", commentsSchema);
const Roles = mongoose.model("Roles", rolesSchema);

module.exports.Users = Users;
module.exports.articles = articles;
module.exports.Comments = Comments;
module.exports.Roles = Roles;

// module.exports.User2 = mongoose.model("User", usersSchema);
// module.exports.Article2 = mongoose.model("Article", articlesSchema);

//User2:mongoose.model("User", usersSchema);
