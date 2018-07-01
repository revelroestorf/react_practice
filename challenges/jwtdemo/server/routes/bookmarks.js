const express = require('express');
const Bookmark = require('../models/bookmark');
const router = express.Router();
const bodyParser = require('body-parser')

// GET /bookmarks (R)
// Url's are now relative to /bookmarks (so only need what comes after /bookmarks)
router.get('/', (req, res) => {
  Bookmark.find().
  then(bookmarks => res.json(bookmarks)
  ).catch(
    error => res.status(500).json({error: error.massage})
  )
})

// POST /bookmarks (C)
router.post('/', (req, res) => {
  // create same as const bookmark = new Bookmark({ title: req.body.title, url: req.body})
  //          bookmark.save()
  Bookmark.create({title: req.body.title, url: req.body.url}).then(
    bookmark => res.send(bookmark)
  ).catch(
    error => res.status(500).json({ error: error.message })
  )
})

// DELETE  /Bookmarks/:id
router.delete('/:id', (req, res) => {
  Bookmark.findByIdAndRemove(req.params.id).then(
    () => res.send(204)
  ).catch(
    error => res.status(500).json({ error: error.message })
  )
})


module.exports = router
