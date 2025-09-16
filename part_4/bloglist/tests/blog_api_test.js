const { test, after, before } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { MONGODB_URI } = require('../utils/config')

const api = supertest(app)

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
