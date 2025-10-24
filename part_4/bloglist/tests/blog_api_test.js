const { test, after, before } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { MONGODB_URI } = require('../utils/config')

const api = supertest(app)

console.log('MONGODB_URI:', MONGODB_URI)

// Optional: debug environment
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('MONGODB_URI:', MONGODB_URI)

before(async () => {
  // Connect to MongoDB before tests
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('✅ Connected to MongoDB')
})

after(async () => {
  // Close the connection after tests
  await mongoose.connection.close()
  console.log('✅ MongoDB connection closed')
})

test('debug /api/blogs', async () => {
  const response = await api.get('/api/blogs')
  console.log('Status:', response.status)
  console.log('Content-Type:', response.headers['content-type'])
  console.log('Body:', response.text)
})

test('debug /api/blogs', async () => {
  const response = await api.get('/api/blogs')
  console.log('Status:', response.status)
  console.log('Content-Type:', response.headers['content-type'])
  console.log('Body:', response.text)
})

const assert = require('node:assert')

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  // Check that 'id' exists
  assert.ok(blog.id, 'Blog should have id')

  // Check that '_id' is undefined
  assert.strictEqual(blog._id, undefined, 'Blog should not have _id')
})


const Blog = require('../models/blog')

test('does it make a new post', async () => {
  // Get blogs before adding
  const blogsAtStart = await Blog.find({})

  const newBlog = {
    title: 'Testing Blog Creation',
    author: 'Janey Weiny',
    url: 'http://altavista.com',
    likes: 5,
  }

  // Make POST request
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // Get blogs after adding
  const blogsAtEnd = await Blog.find({})
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

  // Check that the added blog is in the database
  const titles = blogsAtEnd.map(b => b.title)
  assert.ok(titles.includes('Testing Blog Creation'))
})

console.log("end of test")
