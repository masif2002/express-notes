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
* Some scripts can run directly with `npm <command>` but you need to run others with `npm run <script>`