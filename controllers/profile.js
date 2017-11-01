const router = require('express').Router()
const models = require('../models')
const asyncMiddleware = require('./middleware/asyncMiddleware.js')
const Auth = require('./middleware/auth.js')

router.use(Auth.protect)

async function getProfiles(req, res) {
  const profiles = await models.User.findAll()
  res.send(profiles)
}

router.get('/', asyncMiddleware(getProfiles))

module.exports = router
