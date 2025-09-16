const mongoose = require('mongoose')
const fs = require('fs')
const config = require('./utils/config')
const Blog = require('./models/blog')
const app = require('./app.js')


console.log('ENV:', process.env.NODE_ENV)
console.log('MONGO:', MONGODB_URI)

// Connect to MongoDB and insert sample blogs
mongoose.connect(config.PORT)
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

app.listen(config.serverPORT, () => console.log(`Server running on port ${config.serverPORT}`))
