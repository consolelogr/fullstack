const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
2
const api = supertest(app)


console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('MONGODB_URI:', process.env.MONGODB_URI)


test('debug /api/blogs', async () => {
  const response = await api.get('/api/blogs')
  console.log('Status:', response.status)
  console.log('Content-Type:', response.headers['content-type'])
  console.log('Body:', response.text)
})


/*
test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})

*/