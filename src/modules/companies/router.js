import { Router } from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import { validateRequestSchema } from '../../middlewares/validateRequestSchema.js'
import { CompaniesController } from './controller.js'
import { CompaniesRequestValidations } from './validation.js'

const router = new Router()

router.post(
  '/',
  authenticate,
  validateRequestSchema(CompaniesRequestValidations.createCompany),
  CompaniesController.createCompany
)

export default router
