const express = require('express')
const parseurl = require('parseurl')
const session = require('express-session')
const { countViews } = require('./countviews')

const app = express()

app.use(session({
  secret: 'foobarbat',
  resave: false,
  saveUninitialized: false
}))

app.use(countViews())

app.get('/foo', (req, res) => {
  // views can be anything, does not exist until we set it
  res.send(`You viewed this page ${req.session.views['/foo']} times`)
})

app.get('/bar', (req, res) => {
  res.send(`You viewed this page ${req.session.views['/bar']} times`)
})

app.listen(3333, () => console.log('listening on 3333'))
