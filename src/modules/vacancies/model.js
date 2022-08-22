import mongoose from 'mongoose'
import { VACANCY_OPEN_STATUS, VACANCY_STATUSES } from './constants.js'

const companySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  yearsOfExperience: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    required: true,
    enum: VACANCY_STATUSES,
    default: VACANCY_OPEN_STATUS
  },

  companyId: {
    type: mongoose.Types.ObjectId,
    ref: 'companies',
    required: true
  },

  authorId: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true
  }
})

export const Vacancies = mongoose.model('vacancies', companySchema)
