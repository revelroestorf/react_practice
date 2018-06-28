const mongoose = require('mongoose')
const passport = require('passport-local-mongoose')
// strategy for passport we are using local mongoose strategy (local strategy)
mongoose.connect('mongodb://localhost/express-mongo-passport')

// const User = mongoose.model
  // connect passport to user model.. but can't like in rails so first need to
  // create a schema and attach passport to that
  // Create schema and assign to variable
const user_schema = new mongoose.Schema({
  // key: val,
  // key: val,
  // key: val
})

// plugin is a method of mongoose
// Attach passport to schema
// passport default usernameField is username. We are changing it to email
user_schema.plugin(passport, { usernameField: 'email' })

// console.log(user_schema)

// Create model
module.exports = mongoose.model('User', user_schema)
// arguments are the name and the fields - in this case the schema which has all the fileds
