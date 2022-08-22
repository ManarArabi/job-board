import bcrypt from 'bcrypt'
import randtoken from 'rand-token'

/**
 * It hashes a string
 *
 * @param {Object} args
 * @param {String} args.str
 * @param {Number} [args.rounds = 3]
 *
 * @returns {Promise<String>}
 */
export const hashString = async ({ str, rounds = 3 }) => {
  const hashedString = await bcrypt.hash(str, rounds)

  return hashedString
}

/**
 * It generates a token with the provided size
 *
 * @param {String} size
 *
 * @returns {String}
 */
export const generateRandomToken = (size = 30) => {
  const key = randtoken.generate(size)

  return key
}
