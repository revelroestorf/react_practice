const express = require('express');
const passport = require('passport');
const router = express.Router();
const { User, Product } = require('../models/user')

const { requireJwt, register, signJwtForUser, login, isAdmin, addProduct } = require('../middleware/auth')

router.get('/', (req, res) => {
  res.send('Anyone can view this page!')
})

router.get('/protected', requireJwt, (req, res) => {
  res.send('You have a valid token!')
})

router.get('/admin', requireJwt, isAdmin, (req, res) => {
  res.send('Greetings program')
})

router.post('/register', register, signJwtForUser)

router.post('/login', login, signJwtForUser)


module.exports = router
