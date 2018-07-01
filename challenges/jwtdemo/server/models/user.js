const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Passport-Local Mongoose will add a username, hash and salt field to store the
// username, the hashed password and the salt value. Additionally Passport-Local
// Mongoose adds some methods to your Schema.
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  role: String,
  // age: Number,
});

// Not creating, just configuring.. later call createStrategy!!!!!!!!!!
// connect passportLocalMongoose and use 'email' instead of 'username'
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('User', userSchema);

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number
})

const Product = mongoose.model('Product', productSchema);


module.exports = { User, Product }

// module.exports = mongoose.model('User', User);
