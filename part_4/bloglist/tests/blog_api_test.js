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

// 4.13 DELETE a blog
test('deleting a blog succeeds with status 204', async () => {
  const blogsAtStart = await Blog.find({})
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await Blog.find({})
  const titles = blogsAtEnd.map(b => b.title)

  // Blog count decreased by 1
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  // Deleted blog is gone
  assert.ok(!titles.includes(blogToDelete.title))
})

// 4.14 UPDATE a blog (e.g., likes)
test('updating likes of a blog works', async () => {
  const blogsAtStart = await Blog.find({})
  const blogToUpdate = blogsAtStart[0]

  const updatedData = { likes: blogToUpdate.likes + 1 }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // Verify likes updated
  assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)

  // Optional: verify other fields remain the same
  assert.strictEqual(response.body.title, blogToUpdate.title)
  assert.strictEqual(response.body.author, blogToUpdate.author)
})

