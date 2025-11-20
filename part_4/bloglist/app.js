require('dotenv').config()

const express_middleware = require('./middleware/express_middleware')
const blogsRouter = require('./controllers/blogs')
const app = express_middleware()
const usersRouter = require('./controllers/users')

app.use('/api/users', usersRouter)


// Root route
app.get('/', (req, res) => {
  res.send('Hello! API is running at /api/blogs')
})

// API routes
app.use('/api/blogs', blogsRouter)


module.exports = app