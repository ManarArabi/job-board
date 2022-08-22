import httpStatus from 'http-status'
import _ from 'lodash'
import HttpError from '../common/httpError.js'
import { Users } from '../modules/users/model.js'

const { UNAUTHORIZED } = httpStatus

export const authenticate = async (req, res, next) => {
  try {
    const key = req.header('api-key')

    const user = await Users.findOne({ apiKey: key }).lean()

    if (_.isNil(user)) {
      throw new HttpError({ status: UNAUTHORIZED, message: 'Invalid api key' })
    }

    req.user = user
    req.key = key

    next()
  } catch (err) {
    next(err)
  }
}
