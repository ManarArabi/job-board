import Joi from 'joi'

export const VacanciesRequestValidations = {
  createVacancy: {
    body: {
      title: Joi.string().trim().min(3).required(),
      description: Joi.string().trim().min(3).required(),
      yearsOfExperience: Joi.number().required()
    }
  }
}
