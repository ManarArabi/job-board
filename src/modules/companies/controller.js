import httpStatus from 'http-status'
import { MONGO_ERROR_DUPLICATED_KEY_CODE } from '../../common/constants.js'
import HttpError from '../../common/httpError.js'
import { Companies } from './model.js'

const { CONFLICT, CREATED } = httpStatus

export const CompaniesController = {
  createCompany: async (req, res, next) => {
    const {
      body: {
        name, description, email
      },
      user: { _id: userId }
    } = req

    try {
      const company = await Companies.create({ name, description, email, adminId: userId })

      return res.status(CREATED).json(company).send()
    } catch (err) {
      if (err.code === MONGO_ERROR_DUPLICATED_KEY_CODE) {
        const error = new HttpError({
          message: 'This company email is already exist',
          status: CONFLICT
        })

        return next(error)
      }
      next(err)
    }
  }
}
