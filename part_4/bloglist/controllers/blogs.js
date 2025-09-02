// controllers/blogs.js
const express = require("express");
const Blog = require("../models/blog");
const fs = require("fs");

const blogsRouter = express.Router();

// Root route
blogsRouter.get("/", (req, res) => {
  res.send("Hello! API is running at /api/blogs");
});

// GET all blogs
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// POST a new blog
blogsRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body);
  const result = await blog.save();
  res.status(201).json(result);
});

module.exports = blogsRouter;
