// controllers/blogs.js
const express = require("express")
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const blogsRouter = express.Router()

// Helper to extract token from request
const getTokenFrom = (request) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "")
  }
  return null
}

// GET all blogs
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  res.json(blogs)
})

// POST a new blog (authenticated)
blogsRouter.post("/", async (req, res) => {
  const body = req.body
  const token = getTokenFrom(req)
  
  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (error) {
    return res.status(401).json({ error: "token missing or invalid" })
  }

  if (!decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  // Populate user before returning
  const populatedBlog = await Blog.findById(savedBlog._id).populate("user", {
    username: 1,
    name: 1,
  })

  res.status(201).json(populatedBlog)
})


/*
// vara
blogsRouter.put("/:id", async (req, res) => {
  const id = req.params.id
  const update = {}

  if (req.body.likes !== undefined) update.likes = req.body.likes
  if (req.body.title !== undefined) update.title = req.body.title
  if (req.body.author !== undefined) update.author = req.body.author
  if (req.body.url !== undefined) update.url = req.body.url

  const updated = await Blog.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
    context: "query",
  })

  if (!updated) return res.status(404).json({ error: "blog not found" })

  const populated = await Blog.findById(updated._id).populate("user", {
    username: 1,
    name: 1,
  })

  res.json(populated)
})
*/

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!updated) {
      return res.status(404).end()
    }

    res.json(updated)
  } catch (error) {
    next(error)
  }
})


/*
// DELETE a blog by ID
blogsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id
  const deleted = await Blog.findByIdAndRemove(id)
  if (!deleted) return res.status(404).json({ error: "blog not found" })
  res.status(204).end()
})

*/

// DELETE a blog (Part 5-compliant)
blogsRouter.delete("/:id", async (req, res) => {
  const user = req.user        // set by userExtractor middleware
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(404).json({ error: "blog not found" })
  }

  // Check ownership
  if (blog.user.toString() !== user.id.toString()) {
    return res.status(401).json({ error: "not authorized to delete this blog" })
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})


module.exports = blogsRouter
