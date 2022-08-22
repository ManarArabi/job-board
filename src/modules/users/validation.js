import Joi from 'joi'

export const usersRequestValidations = {
  signUpUser: {
    body: {
      firstName: Joi.string().required().min(3),
      lastName: Joi.string().required().min(3),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(3)
    }
  },

  signInUser: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required().min(3)
    }
  }
}
