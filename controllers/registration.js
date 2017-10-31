const router = require('express').Router()
const models = require('../models')
const asyncMiddleware = require('./middleware/asyncMiddleware.js')
const Auth = require('./middleware/auth.js')

async function signUp(req, res) {
  const password = req.body.password
  if (password) {
    password = await Auth.hashPassword(req.body.password)
  }
  const user = await models.User.create({
    email: req.body.email,
    password: password
  })
  const json = Object.assign(
    user, {
      token: await Auth.genToken()
    }
  )
  res.send(json)
}

async function signIn(req, res) {
  const user = await models.User.findOne({ where: {email: req.body.email} })
  if(await Auth.authenticate(user.password, req.body.password)) {
    res.send({
      token: await Auth.genToken()
    })
  } else {
    res.status(400)
    res.send({message: "Email or password incorrect"})
  }
}

router.post('/sign_up', asyncMiddleware(signUp))
router.post('/sign_in', asyncMiddleware(signIn))

module.exports = router
