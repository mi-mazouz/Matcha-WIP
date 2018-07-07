const bcrypt = require('bcrypt')

const userQuery = require('../../database/queries/user')
const utils = require('../../utils')

module.exports = (mail, password) => {
  logger.info(`A user tried to login with email: ${mail}`)

  return userQuery.getByMail(mail)
  .then((user) => {
    if (!user) throw createError.BadRequest(errors.INVALID_MAIL_OR_PASSWORD)

    return bcrypt.compare(password, user.password)
    .then((passwordMatched) => {
      if (!passwordMatched) throw createError.BadRequest(errors.INVALID_MAIL_OR_PASSWORD)

      return utils.buildToken(user.id)
    })
  })
}