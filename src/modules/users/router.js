import { Router } from 'express'
import { validateRequestSchema } from '../../middlewares/validateRequestSchema.js'
import { UsersController } from './controller.js'
import { UsersRequestValidations } from './validation.js'

const router = new Router()

router.post(
  '/sign-up',
  validateRequestSchema(UsersRequestValidations.signUpUser),
  UsersController.signUpUser
)

router.post(
  '/sign-in',
  validateRequestSchema(UsersRequestValidations.signInUser),
  UsersController.signInUser
)

export default router
