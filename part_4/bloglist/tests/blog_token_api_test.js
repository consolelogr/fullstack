require('dotenv').config()
console.log('ENV MONGO URI:', MONGODB_URI)

const { test, before, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')

const api = supertest(app)

before(async () => {
  console.log('Connecting to:', process.env.MONGODB_URI)
  await mongoose.connect(process.env.MONGODB_URI)
  await User.deleteMany({})
  await Blog.deleteMany({})

  const passwordHash = await bcrypt.hash('secret123', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})

after(async () => {
  await mongoose.connection.close()
})

const getValidToken = async () => {
  const user = await User.findOne({ username: 'root' })
  const userForToken = { username: user.username, id: user._id }
  return jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' })
}

test('creating a blog succeeds with a valid token', async () => {
  const token = await getValidToken()

  const newBlog = {
    title: 'Protected Blog Post',
    author: 'Token Tester',
    url: 'https://securepost.com',
    likes: 12,
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.title, newBlog.title)

  const blogsAtEnd = await Blog.find({})
  assert.strictEqual(blogsAtEnd.length, 1)
  assert.strictEqual(blogsAtEnd[0].title, 'Protected Blog Post')
})

test('creating a blog fails with 401 if token is missing', async () => {
  const newBlog = {
    title: 'Unauthorized Blog',
    author: 'No Token',
    url: 'https://fail.com',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const blogsAtEnd = await Blog.find({})
  assert.strictEqual(blogsAtEnd.length, 1)
})
