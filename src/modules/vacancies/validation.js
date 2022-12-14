import Joi from 'joi'
import { VACANCY_STATUSES } from './constants.js'

export const VacanciesRequestValidations = {
  createVacancy: {
    body: {
      title: Joi.string().trim().min(3).required(),
      description: Joi.string().trim().min(3).required(),
      yearsOfExperience: Joi.number().required(),
      status: Joi.string().valid(...VACANCY_STATUSES)
    }
  },

  updateVacancyStatus: {
    params: {
      id: Joi.string().required()
    },

    body: {
      status: Joi.string().valid(...VACANCY_STATUSES).required()
    }
  },

  listVacancies: {
    query: {
      yearsOfExperience: Joi.number()
    }
  }
}
