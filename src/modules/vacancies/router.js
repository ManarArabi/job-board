import { Router } from 'express'
import { authenticate } from '../../middlewares/authenticate.js'
import { validateRequestSchema } from '../../middlewares/validateRequestSchema.js'
import { VacanciesController } from './controller.js'
import { VacanciesRequestValidations } from './validation.js'

const router = new Router()

router.post(
  '/',
  authenticate,
  validateRequestSchema(VacanciesRequestValidations.createVacancy),
  VacanciesController.createVacancy
)

router.patch(
  '/:id/status',
  authenticate,
  validateRequestSchema(VacanciesRequestValidations.updateVacancyStatus),
  VacanciesController.updateVacancyStatus
)

export default router
