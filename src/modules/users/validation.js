import Joi from 'joi'

export const usersRequestValidations = {
  signupUser: {
    body: {
      firstName: Joi.string().required().min(3),
      lastName: Joi.string().required().min(3),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(3)
    }
  }
}
