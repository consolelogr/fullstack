require("dotenv").config();
const express = require("express");
const cors = require("cors");

const {
  tokenExtractor,
  userExtractor,
} = require("./middleware/express_middleware");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const app = express();

// built-in middleware
app.use(cors());
app.use(express.json());

// custom middleware
app.use(tokenExtractor);
app.use(userExtractor);

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);

app.get("/", (req, res) => {
  res.send("Hello API");
});

module.exports = app;

/* old one befire part 5

require('dotenv').config()

const express_middleware = require('./middleware/express_middleware')
const blogsRouter = require('./controllers/blogs')
const app = express_middleware()
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use('/api/login', loginRouter)

app.use('/api/users', usersRouter)

// Root route
app.get('/', (req, res) => {
  res.send('Hello! API is running at /api/blogs')
})

// API routes
app.use('/api/blogs', blogsRouter)


module.exports = app

*/
