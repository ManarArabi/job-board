import { Router } from 'express'
import UsersRouter from './modules/users/router.js'
import CompaniesRouter from './modules/companies/router.js'

const router = new Router()

router.use('/users', UsersRouter)
router.use('/companies', CompaniesRouter)

export default router
