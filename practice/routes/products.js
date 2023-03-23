const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Products Page")
})

router.get('/add', (req, res) => {
    res.send("Add Products Page")
})

module.exports = router