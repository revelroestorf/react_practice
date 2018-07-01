// dependencies
const express = require('express')
// const routes = require('./routes/index')
const bodyParser = require('body-parser')
// const passport = require('passport');
const mongoose = require('mongoose')
// const User = require('./models/user');
const cors = require('cors')

const { initializePassport } = require('./middleware/auth')

const app = express()

// use static serialize and deserialize of model for passport session support
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// parse json
app.use(bodyParser.json())

// use sessions
// app.use(require('express-session')({
//   secret: 'secret123',
//   resave: false,
//   saveUninitialized: false
// }));

app.use(initializePassport)

// Connect Passport to express
// app.use(passport.initialize());
// app.use(passport.session());

app.use(cors()) // because no url included it will be for all urls

// mongoose
mongoose.connect('mongodb://localhost/express-mongo-passport', (err) => {
  if (err) {
    console.log('Error connecting to database', err)
  } else {
    console.log('Connected to database!')
  }
});

// app.use('/', routes)
app.use('/auth', require('./routes/auth'))
app.use('/bookmarks', require('./routes/bookmarks'))
//


app.listen(4000, () => console.log('Listening on http://localhost:4000'))

module.exports = app
