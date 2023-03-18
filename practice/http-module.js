const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write("Welcome to home page")
    } else if (req.url === '/about') {
        res.write("About page")
    } else res.write("<h1>Page Not Found.</h1> <p>Go back <a href='/'>Home</a></p>")

    res.end()
})

server.listen(5000)