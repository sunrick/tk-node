const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const models = require('./models')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')

const secret = "this is super secure"

function gError(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next)
  }
}

function authenticate (req, res, next) {
  try {
    const decoded = jwt.verify(req.body.token, secret)
    next()
  } catch (e) {
    res.send('401')
  }
}

async function signUp(req, res) {
  const hashedPassword =  await bcrypt.hash(req.body.password, 12)
  const user = await models.User.create({
    email: req.body.email,
    password: hashedPassword
  })
  const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60) }, secret)
  res.send(Object.assign(user, {token: token}))
}

async function login(req, res) {
  res.send({ loggedIn: true })
}

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(morgan('combined'))

app.post("/sign_up", gError(signUp))
app.use(authenticate)
app.post("/sign_in", gError(login))

app.listen(process.env.PORT || 3000)
