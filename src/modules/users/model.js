import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  password: {
    type: String, // hashed
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },

  apiKey: {
    type: String
  }
})

export const Users = mongoose.model('users', userSchema)
