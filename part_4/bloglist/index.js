const mongoose = require('mongoose')
const fs = require('fs')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const Blog = require('./models/blog')

const express_middleware = require('./middleware/express_middleware')
const app = express_middleware()
const mongoUrl = config.PORT;



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
