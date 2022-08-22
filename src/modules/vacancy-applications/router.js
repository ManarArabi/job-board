import { Router } from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import { validateRequestSchema } from '../../middlewares/validateRequestSchema.js'
import { vacancyApplicationsController } from './controller.js'
import { VacancyApplicationRequestValidations } from './validation.js'

const router = new Router()

router.post(
  '/vacancy/:vacancyId',
  authenticate,
  validateRequestSchema(VacancyApplicationRequestValidations.applyForVacancy),
  vacancyApplicationsController.applyForVacancy
)

export default router
