import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },

  adminId: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true
  }
})

export const Companies = mongoose.model('companies', companySchema)
