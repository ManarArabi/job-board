import { Router } from 'express'
import UsersRouter from './modules/users/router.js'
import CompaniesRouter from './modules/companies/router.js'
import VacanciesRouter from './modules/vacancies/router.js'
import VacancyApplicationsRouter from './modules/vacancy-applications/router.js'

const router = new Router()

router.use('/users', UsersRouter)
router.use('/companies', CompaniesRouter)
router.use('/vacancies', VacanciesRouter)
router.use('/vacancy-applications', VacancyApplicationsRouter)

export default router
