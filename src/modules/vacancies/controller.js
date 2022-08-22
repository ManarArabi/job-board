import httpStatus from 'http-status'
import _ from 'lodash'
import HttpError from '../../common/httpError.js'
import { Companies } from '../companies/model.js'
import { VACANCY_OPEN_STATUS } from './constants.js'
import { Vacancies } from './model.js'

const { UNPROCESSABLE_ENTITY, CREATED, NOT_FOUND, FORBIDDEN, NO_CONTENT, OK } = httpStatus

export const VacanciesController = {
  createVacancy: async (req, res, next) => {
    try {
      const {
        body: { title, description, yearsOfExperience, status = VACANCY_OPEN_STATUS },
        user: { _id: userId }
      } = req

      const company = await Companies.findOne({ adminId: userId }, { _id: 1 }).lean()

      if (_.isNil(company)) {
        throw HttpError({ message: 'The caller is not an admin for any registered company', status: UNPROCESSABLE_ENTITY })
      }

      const vacancy = await Vacancies.create({ title, description, status, yearsOfExperience, companyId: company._id, authorId: userId })

      return res.json(vacancy).status(CREATED).send()
    } catch (err) {
      next(err)
    }
  },

  updateVacancyStatus: async (req, res, next) => {
    try {
      const {
        body: { status },
        params: { id: vacancyId },
        user: { _id: userId }
      } = req

      const vacancy = await Vacancies.findOne({ _id: vacancyId }, { authorId: 1 }).lean()
      if (_.isNil(vacancy)) {
        throw HttpError({ message: 'There is no vacancy with the provided id', status: NOT_FOUND })
      }

      if (String(vacancy.authorId) !== String(userId)) {
        throw HttpError({ message: 'The caller has no access for the provided vacancy', status: FORBIDDEN })
      }

      await Vacancies.updateOne({ _id: vacancyId }, { status })

      return res.status(NO_CONTENT).send()
    } catch (err) {
      next(err)
    }
  },

  listVacancies: async (req, res, next) => {
    try {
      const {
        query: { yearsOfExperience }
      } = req

      const queryMatcher = { status: VACANCY_OPEN_STATUS }
      if (!_.isNil(yearsOfExperience)) {
        queryMatcher.yearsOfExperience = yearsOfExperience
      }

      const vacancies = await Vacancies.find(queryMatcher).lean()
      return res.status(OK).json(vacancies).send()
    } catch (err) {
      next(err)
    }
  }
}
