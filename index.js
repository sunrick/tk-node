require('dotenv').config()
const express = require('express')
const app = express()

// Middleware
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// Controllers
const registration = require('./controllers/registration.js')
const user = require('./controllers/user.js')
const profile = require('./controllers/profile.js')

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(morgan('combined'))

app.use('/', registration)
app.use('/user', user)
app.use('/profiles', profile)

// app.use((err, req, res, next) => {
//   res.status(422)
//   res.send({ error: err.toString() })
//   next()
// })

app.listen(process.env.PORT || 3000)
