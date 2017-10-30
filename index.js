const express = require('express')
const app = express()
const cors = require('cors')
const models = require('./models')
const morgan = require('morgan')

function gError(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next)
  }
}

async function signUp(req, res) {
  const user = await models.User.create({
    first_name: req.params.firstName,
    last_name: req.params.lastName
  })
  res.send(user)
}

async function login(req, res) {
  res.send({ loggedIn: true })
}

app.use(cors())
app.use(morgan('combined'))

app.post("/sign_up", gError(signUp))
app.post("/sign_in", gError(login))

app.listen(process.env.PORT || 3000)
