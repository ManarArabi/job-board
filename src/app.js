import express from 'express'
import dotenv from 'dotenv'
import appRouter from './router.js'
import { ErrorHandler } from './middlewares/error-handler.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(appRouter)
app.use(ErrorHandler)

export default app
