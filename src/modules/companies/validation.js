import Joi from 'joi'

export const CompaniesRequestValidations = {
  createCompany: {
    body: {
      name: Joi.string().min(3).required(),
      description: Joi.string().min(3).required(),
      email: Joi.string().email().required()
    }
  }
}
