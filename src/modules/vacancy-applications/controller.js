import httpStatus from 'http-status'
import _ from 'lodash'
import HttpError from '../../common/httpError.js'
import { VACANCY_CLOSED_STATUS } from '../vacancies/constants.js'
import { Vacancies } from '../vacancies/model.js'
import { VacancyApplications } from './model.js'

const { NOT_FOUND, UNPROCESSABLE_ENTITY, CREATED } = httpStatus
export const vacancyApplicationsController = {
  applyForVacancy: async (req, res, next) => {
    try {
      const {
        params: { vacancyId },
        user: { _id: userId }
      } = req

      const vacancy = await Vacancies.findOne({ _id: vacancyId }, { companyId: 1, status: 1 }).lean()
      if (_.isNil(vacancy)) {
        throw new HttpError({ message: 'There is no vacancy with the provided id', status: NOT_FOUND })
      }

      if (vacancy.status === VACANCY_CLOSED_STATUS) {
        throw new HttpError({ message: 'The provided vacancy is closed', status: UNPROCESSABLE_ENTITY })
      }

      const userVacancyApplicationCount = await VacancyApplications.countDocuments({ userId, vacancyId })
      if (userVacancyApplicationCount > 1) {
        throw new HttpError({ message: 'User applied for this vacancy before', status: UNPROCESSABLE_ENTITY })
      }

      const oneDayInMilliSeconds = 24 * 60 * 60 * 1000

      const userVacanciesApplicationCounts = await VacancyApplications.countDocuments({ userId, createdAt: { $gte: oneDayInMilliSeconds } })
      if (userVacanciesApplicationCounts === 3) {
        throw new HttpError({ message: 'Vacancy applications have reached their limit today', status: UNPROCESSABLE_ENTITY })
      }

      await VacancyApplications.create({ vacancyId, userId, companyId: vacancy.companyId })

      return res.status(CREATED).send()
    } catch (err) {
      next(err)
    }
  }
}
