const express = require('express')
const app = express()
const models = require('./models')
const morgan = require('morgan')

function gError(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next)
  }
}

app.use(morgan('combined'))

app.listen(process.env.PORT || 3000)
