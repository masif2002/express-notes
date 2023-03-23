# Node.js
## Global Variables
```
__dirname
__filename 
process - info about the env where program is executed
require - function to use modules
module - info about current module
...
```

## Modules
* Remember when you import a module, the code in the module is executed
### How to use modules
```js
// utils.js
const sayHi = (name) => {
    console.log(`Hi ${name}`)
}

module.exports = sayHi
```
* `exports` is a field (key) in the `module` object (global variable)
```js
// app.js
const sayHi = require('./utils') // imports the module

const asif = "Asif";
sayHi(asif)
```
* Make sure you have the `.` at the beginning in the require function
* Also note that there is no `.js` at the end of the file

### Exporting multiple values
```js
const asif = "Asif";
const madhu = "Madhu";
const manoj = "Manoj"

module.exports = { asif, manoj } // Converted to ES6 Syntax from { asif: asif, manoj: manoj }
```
* It is not necessary that you export it as an object, you can also export it anyway you like
### Inbuilt modules
```
os
path
fs (filesystem)
http
```
* These are some of the inbuilt modules
* You can have sync/async read-writes with the fs module
___
```js
const os = require('os')
```
* This is how you use an in-built module. Note that there isno `./` in the beginning

## Npm
* Node Package manager
* Ton of packages available for use
```
npm i <package_name> # installs package locally
npm install -g <package_name> # installs globally
```
### node_modules
* This folder contains all the installed dependencies
## package.json
* `package.json` file contains info about packages used in the project
* You can create `package.json` file manually or use `npm init` as well
    * `npm init -y` to skip all the questions
* Running `npm install` in a project that contains a `package.json` file automatically installs all the packages for you
### Dev Dependency
* You can install packages as Dev Dependencies as well. Dev Dependencies means that these dependencies are only useful in the dev enviroment (not in production)
* You can install the same set of depencies in the normal fashion, but this would make more sense
```
npm install <package_name> -D   
```
### Scripts
* You can have multiple scripts to run from command line
```js
...
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
```
* `npm start` runs the script
* `npm run dev` runs the dev script
* Some scripts can run directly with `npm <command>` but you need to run usually with `npm run <script>`

## Event Loops
* Event Loops are like an internal thing in JS, that takes care of asynchronous tasks
* JavaScript is synchronous and single threaded by default
* During asynchronous tasks, **Event Loop** registers the asynchronous callback and executes the callback only when there is no immediate code to execute

## Promise, Async, Await
* JavaScript is synchronous in nature
* A function that returns a Promise is a an asynchronous function
* `await` is used to wait for the asynchronous functiion to complete first and then execute

### Ways to return a promise
```js
// Explicitly returning a Promise
const greet = (text) => {
    return new Promise((resolve, reject) => {
        if (text) resolve("Hello World")
        else reject("No text")
    })
}


const sayHello = async () => {
    await greet()
    .then((msg) => console.log(msg) )
    .catch((err) => console.log(err))
}

sayHello()
```
```js
// "Node" ways of functions returning a promise
// Method 1
const { readFile, writeFile } = require('fs')
const utils = require('util')
utils.promisify(readFile)
utils.promisify(writeFile)

// Method 2
const { readFile, writeFile } = require('fs').promises

```
## Event Emitters
* We have event emitters in node with which we can perform certain set of tasks if a certain event occurs
* Many modules in node internally use Event Emitters

## Streams
* Streams are used to read/write data in chunks
* When sending data across the network, sending data in chunks can help improve your app performance

## Express.js
* ExpressJS is a Node.js framework built on top of the http module

## Serving static files
```js
// Express fetches all the static files from the public folder in this case
app.use(express.static('./public'))
```
* You can also dump the `index.html` file in the public folder and Express will by default serve the index.html file at the route `/`

## Route parameters
```js
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params
    const singleProduct = products.find((product) => 
        product.id === Number(id) 
    )
    return res.json(singleProduct)
})
```

## Query parameters
```js

app.get('/api/v1/search', (req, res) => {
    const { term } = req.query

    let newProducts = products
    newProducts = newProducts.filter((product) => product.name.startsWith(term))

    if (newProducts.length < 1) return res.status(200).json('No Products found')

    return res.json(newProducts)
})
```

## Middleware
```
request => Middleware => response
```
* You get the request and perform some action in the middleware and pass it as a response. This is the general usecase of middelware
* You can create your own middleware functions like shown below, and also use Express's own MW or 3rd party MW functions (from npm)
____
```js
const logger = (req, res, next) => {
    const method = req.method
    const url = req.url 
    const date = new Date()
    console.log([method, url, date])
    next()
}

const greet = (req, res, next) => {
    console.log("Hello World")
}

app.get('/', [logger, greet], (req, res) => {
    res.json("Yoo")
})

app.get('/about', logger, (req, res) => {
    res.send("About")
})
```
* Here, `logger` and `greet` are two middleware functions for the route `/`
* Here, the `next()` method is used to pass the control to the next middleware function
> If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
____
```js
const logger = (req, res, next) => {
    const method = req.method
    const url = req.url 
    const date = new Date()
    res.send([method, url, date])
}

app.get('/', logger, (req, res) => {
    res.json("Yoo")
})

app.get('/about', logger, (req, res) => {
    res.send("About")
})
```
* Here, the request-response cycle is completed in the middleware function, so the `next()` function is not needed

### Passing middleware to multiple routes
```js
app.use(logger)
```
* This line passes the `logger` middleware function to all the routes written below it
* If you need to pass multiple functions, pass in an array of functions
____
```js
app.use('api/v1/', logger)
```
* This passes the middleware function to all the routes that start with `api/v1/`

### Middleware function to parse request body
```js
// parse form data
app.use(express.urlencoded({ extended: false }))
```
* When sending form data through POST request, the data is sent in the bofy od the request. To parse that data, we need to set up this middleware function
* `req.body` gives the data sent in the body
____
* Similarly, for parsing json 
```js
// parse json
app.use(express.json())
```
* For every `Content-Type` in the request header, there is a middleware function to parse that specific content type. (That's what I think)

## Express Router
* Express Router provides a way to group routes to maintain a neat hierarchy
* Usually routes with a common prefix are grouped together
* Check out the [sample code](./practice/express-router.js)

### Controllers
* Controllers is just another way to organize the routes in the express router
* We basically move all the functions to a dir named controllers and call those specific functions on hitting those specific routes
```js
// Before Controllers
// ./routes/auth.js 
const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
    res.status(200).send("Login Page")
})

router.get('/signup', (req, res) => {
    res.status(200).send("Sign Up Page")
})

module.exports = router
```
```js
//  After Controllers
// ./routes/auth.js 
const express = require('express')
const {
    loginFunctionality,
    signupFunctionality
} = require('../controllers.auth.js')

const router = express.Router()

router.get('/login', loginFunctionality)
router.get('/signup', signupFunctionality) 

module.exports = router
```
```js
// ./controllers/auth.js
const loginFunctionality = (req, res) => {
    res.status(200).send("Login Page")
}

const signupFunctionality = (req, res) => {
    res.status(200).send("Sign Up Page")
}

module.exports = {
    loginFunctionality,
    signupFunctionality
}
```