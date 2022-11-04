require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PORT } = process.env;
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/posts");
const { register, login } = require("./controllers/auth");
const { isAuthenticated } = require("./middleware/isAuthenticated");

const app = express();

app.use(express.json());
app.use(cors());

//Auth
app.post("/register", register);
app.post("/login", login);

//GET POST
app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

app.listeners(PORT, () =>
  console.log("database is up & server running on ${PORT}")
);