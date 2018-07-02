const passport = require('passport')
const PassportJwt = require('passport-jwt')
const JWT = require('jsonwebtoken')
const { User, Product } = require('../models/user')

const jwtSecret = 'doggo123' // Should come from ENV
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '1m' // or 30m or 500s

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy())

// Tell Passport to process JWT
passport.use(new PassportJwt.Strategy({
  jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
  algorithms: [jwtAlgorithm]
}, (payload, done) => {
  // find user with id equal to payload.sub which just got passed through in request
  User.findById(payload.sub).then((user) => {
    if (user) {
      // done is pass of passport - arguments 2: first is error and second is the desired return value / object
      done(null, user)
      // now can call req.user
    } else {
      done(null, false)
    }
  }).catch((error) => {
    done(error, false)
  })
}))

// middleware custom!!
const register = (req, res, next) => {
  // 'register' below is a mongoose method
  // args: 1- user info, 2- password, 3- callback (takes ares: 1- err, 2- new user object)
  User.register(new User({ email: req.body.email, role: 'admin' }), req.body.password, (err, user) => {
    if (err) {
      // return so that break out and not run anymore middleware
      return res.status(500).send(err.message);
    }
    // Add user to request so that later middleware can access it
    req.user = user
    next()
  })
}

// Authorization (All this other shit is authentication)
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role && req.user.role === 'admin') {
    next()
  } else {
    return res.sendStatus(403)
  }
}

const addProduct = (req, res, next) => {
  // if (req.user.role && req.user.role === 'admin') {
  //   next()
  // } else {
    // return res.sendStatus(403)
  // }
  req.product = new Product({ title: req.body.title, description: req.body.description, price: req.body.price})
  req.product.save().then(() => {
    next()
  })
}

// Create a JWT (user just logged in or registered)
const signJwtForUser = (req, res) => {
    // Use JWT to create a signed token
    const token = JWT.sign(
      // Payload
      {
        sub: req.user._id.toString(),
        email: req.user.email
      },
      // Secret
      jwtSecret,

      // Options (config that is passed to the 'sign' function)
      {
        algorithm: jwtAlgorithm,
        expiresIn: jwtExpiresIn
      }
    )

    res.json({token: token})
}

module.exports = {
  initializePassport: passport.initialize(),
  requireJwt: passport.authenticate('jwt', { session: false }),
  login: passport.authenticate('local', { session: false }), // either return 401 or set user object in request
  register,
  signJwtForUser,
  isAdmin,
  addProduct
}
