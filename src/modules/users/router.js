import { Router } from 'express'
import { validateRequestSchema } from '../../middlewares/validateRequestSchema.js'
import { usersController } from './controller.js'
import { usersRequestValidations } from './validation.js'

const router = new Router()

router.post(
  '/users/sign-up',
  validateRequestSchema(usersRequestValidations.signupUser),
  usersController.signupUser
)

export default router
