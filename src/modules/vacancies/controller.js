import httpStatus from 'http-status'
import _ from 'lodash'
import HttpError from '../../common/httpError.js'
import { Companies } from '../companies/model.js'
import { Vacancies } from './model.js'

const { UNPROCESSABLE_ENTITY, CREATED } = httpStatus

export const VacanciesController = {
  createVacancy: async (req, res, next) => {
    try {
      const {
        body: { title, description, yearsOfExperience },
        user: { _id: userId }
      } = req

      const company = await Companies.findOne({ adminId: userId }, { _id: 1 }).lean()

      if (_.isNil(company)) {
        throw HttpError({ message: 'The caller is not an admin for any registered company', status: UNPROCESSABLE_ENTITY })
      }

      const vacancy = await Vacancies.create({ title, description, yearsOfExperience, companyId: company._id, authorId: userId })

      return res.json(vacancy).status(CREATED).send()
    } catch (err) {
      next(err)
    }
  }
}
