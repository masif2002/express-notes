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