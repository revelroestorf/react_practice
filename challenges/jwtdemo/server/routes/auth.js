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

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });
//

router.get('/products', async (req, res) => {
  let allProducts = await Product.find()
  allProducts = allProducts.map((product) => {
    return (`
      <li>${product}</li>
      `)
  })
  res.send(`
    <h3>products:</h3>
    <ol>${allProducts}</ol>

    `)
})

router.post('/products/new', requireJwt, isAdmin, addProduct, (req, res) => {
  // const allProducts = () => {
  //   for (let key in Product.find()) {
  //     console.log(key)
  //   }
  const allProducts = Product.find().then((prom) => {
    return prom
  })

  res.send(`
    <h1>New product added: ${req.product.title}</h1>
    <h3>products:</h3>
    <ol>${allProducts}</ol>

    `)
})

module.exports = router
