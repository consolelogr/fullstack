const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  passwordHash: String,      // store hashed password only
  blogs: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash   // never send the hash to client
  }
})

module.exports = mongoose.model('User', userSchema)
