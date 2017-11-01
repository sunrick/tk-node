const router = require('express').Router()
const models = require('../models')
const asyncMiddleware = require('./middleware/asyncMiddleware.js')
const Auth = require('./middleware/auth.js')

router.use(Auth.protect)

async function getUser(req, res) {
  res.send(req.user)
}

async function updateUser(req, res) {
  try {
    await req.user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      title: req.body.title,
      description: req.body.description
    })
  } catch(e) {
    res.status(422)
    res.send({message: "didn't update"})
  }
}

router.get('/', asyncMiddleware(getUser))
router.put('/', asyncMiddleware(updateUser))

module.exports = router
