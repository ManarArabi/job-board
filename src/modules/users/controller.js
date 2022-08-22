import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import _ from 'lodash'
import { MONGO_ERROR_DUPLICATED_KEY_CODE } from '../../common/constants.js'
import { generateRandomToken, hashString } from '../../common/helpers.js'
import HttpError from '../../common/httpError.js'
import { Users } from './model.js'

const { CONFLICT, CREATED, NOT_FOUND, UNAUTHORIZED, OK } = httpStatus

export const UsersController = {
  signUpUser: async (req, res, next) => {
    const {
      body: {
        firstName,
        lastName,
        email,
        password
      }
    } = req

    try {
      const hashedPassword = await hashString({ str: password })

      const apiKey = generateRandomToken()
      await Users.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        apiKey
      })

      return res.status(CREATED).json(apiKey).send()
    } catch (err) {
      if (err.code === MONGO_ERROR_DUPLICATED_KEY_CODE) {
        const error = new HttpError({
          message: 'This user email is already exist',
          status: CONFLICT
        })

        return next(error)
      }

      next(err)
    }
  },

  signInUser: async (req, res, next) => {
    const {
      body: {
        email,
        password
      }
    } = req

    try {
      const user = await Users.findOne({ email }, { password: 1 }).lean()
      if (_.isNil(user)) {
        throw new HttpError({
          message: 'This user email does not exist',
          status: NOT_FOUND
        })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        throw new HttpError({ status: UNAUTHORIZED, message: 'Wrong password' })
      }

      const apiKey = generateRandomToken()
      await Users.updateOne({ email }, { apiKey })

      return res.status(OK).json(apiKey).send()
    } catch (err) {
      next(err)
    }
  }
}
