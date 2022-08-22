import { Router } from 'express'
import { validateRequestSchema } from '../../middlewares/validateRequestSchema.js'
import { usersController } from './controller.js'
import { usersRequestValidations } from './validation.js'

const router = new Router()

router.post(
  '/sign-up',
  validateRequestSchema(usersRequestValidations.signUpUser),
  usersController.signUpUser
)

router.post(
  '/sign-in',
  validateRequestSchema(usersRequestValidations.signInUser),
  usersController.signInUser
)

export default router
