const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs')
const config = require('./utils/config')
const Blog = require('./models/blog')
const app = express()

const mongoUrl = config.PORT;

// Middleware
app.use(express.json())

// Root route
app.get('/', (req, res) => {
  res.send('Hello! API is running at /api/blogs')
})

// API routes
app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  const blog = new Blog(req.body)
  const result = await blog.save()
  res.status(201).json(result)
})

// Connect to MongoDB and insert sample blogs
mongoose.connect(mongoUrl)
  .then(async () => {
    console.log('Connected to MongoDB')

    const count = await Blog.countDocuments({})
    if (count === 0) {
      const data = JSON.parse(fs.readFileSync('./api/blogs.json', 'utf8'))
      for (const item of data) {
        const blog = new Blog(item)
        await blog.save()
      }
      console.log('Sample blogs inserted!')
    }
  })
  .catch(err => console.error('MongoDB connection error:', err))

// Start server
const PORT = 3003
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
