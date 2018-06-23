const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')
const User = require('./db')
const session = require('express-session')

const app = express()

// Tell passport to use the strategy for our model
passport.use(User.createStrategy())

// Tell passpord to use our User model to serialize/deserialize the user
// This is required in order to store the user in the session
// use for post requests
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(session({
  secret: 'boobarbat',
  // don't refresh the save or don't save locally
  resave: false,
  // don't save session unless things change
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
  console.log(req.session, req.session)
  //req object will have user object once logged in
  res.send(`You are logged ${req.user ? 'in as '+JSON.stringify(req.user) : 'out'}`)
  // console.log(req.user || "None!!!!!")
})

app.get('/welcome', (req, res) => {
  res.send(`
    <h2>You are logged in as id: ${req.user.id}<h2>
    <form action="/logout">
     <button type="submit">Logout</button>
    </form>
    `)
})

app.post('/register', (req, res) => {
  User.register(new User({ email: req.body.email }), req.body.password, (err) => {
    // Fail
    if (err) {
      console.log(err)
      return res.status(500).send(err.message)
    }
// Success!!
    const func = passport.authenticate('local')
    // Returns a function similar to require(express)
    // below takes 3 args, third being an annonimouse function
    func(req, res, () => {
      res.redirect('/')
    })
  })
})

app.post('/login', passport.authenticate('local'), (req, res) => {
  // Will
  res.send()
  // res.redirect('/welcome')
})

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('http://localhost:3000/')
})

// Listen
app.listen(5555, () => console.log('listening on 5555'))
