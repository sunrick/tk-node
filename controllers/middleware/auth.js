const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('../../models')

class Auth {

  static authenticate (dbPassword, attemptedPassword) {
    dbPassword = dbPassword || "randompassword"
    attemptedPassword = attemptedPassword || "randomwrongpassword"
    return bcrypt.compare(attemptedPassword, dbPassword)
  }

  static hashPassword(password) {
    return bcrypt.hash(password, 12)
  }

  static genToken(id) {
    return jwt.sign({ id: id, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, process.env.SECRET)
  }

  static async protect(req, res, next) {
    try {
      const decoded = jwt.verify(req.get('Authorization'), process.env.SECRET)
      req.user = await models.User.findById(decoded.id)
      next()
    } catch(e) {
      next(e)
    }
  }

}

module.exports = Auth
