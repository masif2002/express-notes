const express = require('express')
const auth = require('./routes/auth')
const products = require('./routes/products')

const app = express()

app.use('/auth', auth)
app.use('/products', products)

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(5000, ()=>{
    console.log("Server listening on port 5000....")
})

