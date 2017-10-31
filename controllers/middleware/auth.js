const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class Auth {

  static authenticate (dbPassword, attemptedPassword) {
    dbPassword = dbPassword || "randompassword"
    attemptedPassword = attemptedPassword || "randomwrongpassword"
    return bcrypt.compare(attemptedPassword, dbPassword)
  }

  static hashPassword(password) {
    return bcrypt.hash(password, 12)
  }

  static genToken() {
    return jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60) }, process.env.SECRET)
  }

  static middleware(req, res, next) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET)
    } catch(e) {
      next(e)
    }
  }

}

module.exports = Auth
