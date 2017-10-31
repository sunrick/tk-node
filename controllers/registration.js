const router = require('express').Router()

function gError(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next)
  }
}
async function signUp(req, res) {
  const hashedPassword =  await bcrypt.hash(req.body.password, 12)
  const user = await models.User.create({
    email: req.body.email,
    password: hashedPassword
  })
  const token =
  res.send(Object.assign(user, {token: token}))
}

async function signIn(req, res) {
  res.send({ loggedIn: true })
}

function genToken() {
  return  jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60) }, process.env.SECRET)
}

router.post('/sign_up', gError(signUp))
router.post('/sign_in', gError(signIn))

module.exports = router
