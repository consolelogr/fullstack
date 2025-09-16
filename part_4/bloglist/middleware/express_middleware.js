// middleware/express_middleware.js
const express = require('express')

module.exports = () => {
  const app = express()

  app.use(express.json()) // <--- THIS MAKES JSON WORK

  // you can also add logging middleware etc here if needed
  return app
}

