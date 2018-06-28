const passport = require('passport')
const PassportJwt = require('passport-jwt')
const JWT = require('jsonwebtoken')
const User = require('./server/db.js')

const jwtSecret = 'doggo123' //should put in ENV
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '6h'

// Tell passport to use the strategy for our model
passport.use(User.createStrategy())

// Tell Passport to process JWT
passport.use(new Passport.Jwt.Strategy({
  jwtFromRequest: PassportJwt.ExtractJwt.FromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
  algorithms: [jwtAlgorithm]
  // the above is just the standard code required
}, (payload, done) => {
  User.findBy(payload.subject).then((User) => {
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  }).catch((error) => {
    done(error, false)
  })
}))

const reqister = (req, res, next) => {
    User.register(new User({ email: req.body.email }), req.body.password, (err, user) => {
      if (err) {
        return res.status(500).send(err.message)
      }
      // Add user to the request so that later middleware can access it
      req.user = user
      next()
  })
}

// Create a JWT (user just logged in or registered)
const signJwtForUser = (req, res) => {
  const token = JWT.sign(
    // payload
    { email: req.user.email },
    // secret
    jwtSecret,
    // Header
    {
      subject: req.user._id.toString(),
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn
     }
  )
  res.json({token: token})
}

module.exports = {
  initializePassport: passport.initialize(),
  requireJwt: passport.authenticate('jwt', { session: false }),
  login: passport.authenicate('local', { session: false }), // cause we are using token, not session
  register,
  signJwtForUser
}
