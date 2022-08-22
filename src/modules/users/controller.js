import httpStatus from 'http-status'
import { MONGO_ERROR_DUPLICATED_KEY_CODE } from '../../common/constants.js'
import { generateRandomToken, hashString } from '../../common/helpers.js'
import HttpError from '../../common/httpError.js'
import { Users } from './model.js'

const { CONFLICT, CREATED } = httpStatus

export const usersController = {
  signupUser: async (req, res, next) => {
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
  }
}
