import Joi from 'joi'

export const VacancyApplicationRequestValidations = {
  applyForVacancy: {
    params: {
      vacancyId: Joi.string().required()
    }
  }
}
