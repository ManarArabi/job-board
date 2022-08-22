import mongoose from 'mongoose'

const vacancyApplicationSchema = new mongoose.Schema({
  createdAt: {
    type: Number,
    default: () => new Date().valueOf()
  },

  companyId: {
    type: mongoose.Types.ObjectId,
    ref: 'companies',
    required: true
  },

  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true
  },

  vacancyId: {
    type: mongoose.Types.ObjectId,
    ref: 'vacancies',
    required: true
  }
})

export const VacancyApplications = mongoose.model('vacancyApplications', vacancyApplicationSchema)
