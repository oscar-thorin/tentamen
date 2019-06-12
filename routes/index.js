const express = require('express')
const router = express.Router()

const book = require('./book.js')

router.get("/books", book.get)

module.exports = router