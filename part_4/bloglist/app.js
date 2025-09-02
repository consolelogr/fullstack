const express_middleware = require('./middleware/express_middleware')
const blogsRouter = require('./controllers/blogs')
const app = express_middleware()


// Root route
app.get('/', (req, res) => {
  res.send('Hello! API is running at /api/blogs')
})

// API routes
app.use('/api/blogs', blogsRouter)

module.exports = app