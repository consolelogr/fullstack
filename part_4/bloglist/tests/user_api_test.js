const { test, after, beforeEach, before } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const { MONGODB_URI } = require('../utils/config')

const api = supertest(app)

// --- Connect and clean database ---
before(async () => {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('✅ Connected to MongoDB for user tests')
})

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'Superuser', passwordHash })
  await user.save()
})

after(async () => {
  await mongoose.connection.close()
  console.log('✅ MongoDB connection closed after user tests')
})


// --- TESTS ---

test('creation succeeds with a fresh username', async () => {
  const usersAtStart = await User.find({})

  const newUser = {
    username: 'newuser',
    name: 'New User',
    password: 'strongpass',
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await User.find({})
  assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  assert.ok(usernames.includes(newUser.username))
})

test('creation fails if username already exists', async () => {
  const usersAtStart = await User.find({})

  const newUser = {
    username: 'root',
    name: 'Duplicate',
    password: 'password123',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert.match(result.body.error, /expected `username` to be unique/i)

  const usersAtEnd = await User.find({})
  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test('creation fails if username is shorter than 3 chars', async () => {
  const newUser = {
    username: 'ab',
    name: 'Short User',
    password: 'validpass',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert.match(result.body.error, /username.*at least 3/i)
})

test('creation fails if password is shorter than 3 chars', async () => {
  const newUser = {
    username: 'shortpassuser',
    name: 'Short Password',
    password: 'pw',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert.match(result.body.error, /password.*at least 3/i)
})

test('creation fails if username or password missing', async () => {
  const invalidUsers = [
    { name: 'Missing username', password: 'secret' },
    { username: 'nouserpass', name: 'Missing password' },
  ]

  for (const u of invalidUsers) {
    const result = await api
      .post('/api/users')
      .send(u)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.match(result.body.error, /(username|password)/i)
  }
})
