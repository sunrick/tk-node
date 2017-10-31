require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const models = require('./models')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')

const registration = require('./controllers/registration.js')

function authenticate (req, res, next) {
  try {
    const decoded = jwt.verify(req.body.token, secret)
    next()
  } catch (e) {
    next(e)
  }
}

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(morgan('combined'))

app.use('/', registration)

app.listen(process.env.PORT || 3000)
