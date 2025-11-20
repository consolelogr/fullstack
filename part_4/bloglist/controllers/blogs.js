// controllers/blogs.js
const express = require("express");
const Blog = require("../models/blog");
const fs = require("fs");

const blogsRouter = express.Router();


const jwt = require("jsonwebtoken");
const User = require("../models/user");

// helper to extract token
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};


/*
// Root route
blogsRouter.get("/", (req, res) => {
  res.send("Hello! API is running at /api/blogs");
});
*/

// GET
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

/*/ POST
blogsRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body);
  const result = await blog.save();
  res.status(201).json(result);
});
*/

// POST (with token authentication)
blogsRouter.post("/", async (req, res) => {
  const body = req.body;

  const token = getTokenFrom(req);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  if (!decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});




// DELETE
blogsRouter.delete("/", async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndRemove(id);
  res.status(204).end();
 });

// PUT (update)
blogsRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedBlog);
});


module.exports = blogsRouter;
