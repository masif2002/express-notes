const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
    res.status(200).send("Login Page")
})

router.get('/signup', (req, res) => {
    res.status(200).send("Sign Up Page")
})

module.exports = router