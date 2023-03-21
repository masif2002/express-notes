const express = require('express')

const app = express()

// Express fetches all the static files from the public folder in this case
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.status(200).send("Home Page")
})

app.get('/about', (req, res) => {
    res.status(200).send("About Page")
})

app.all('*', (req, res) => {
    res.status(404).send("<h1> 404 Page Not Found </h1>")
})

app.listen(5000, () => {
    console.log("server is running ...");
})