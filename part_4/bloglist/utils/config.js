
//const PORT = 'mongodb://localhost/bloglist'
const PORT = process.env.PORT
const serverPORT = 3003

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
  serverPORT
}
