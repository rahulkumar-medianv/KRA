/*

- Variables declarations
- Arrow Functions
- Destructuring (object & Array)
- JavaScript Modules (export and import)
- Async Program (promise, callbackes, async/Await)
- JavaScript Execution Model & Event Loop (Call Stack, Event Loop)
- Node.js Core Modules (fs, http, os, path)
- TypeScript Fundamentals (setup, run code, define dataTypes, functions, interface)


*/

console.log("Hello");

// const a = 10; //  Assignment to constant variable.
let x = 20;

a = x;
a = 30;
console.log(a);

let name = "Ram"; // var name = "Ram" // variable declaration and initialization (var and let)
name = "Sita"; // re-assigned the value
console.log(name);

// var allow to re-declaration with the same name
var car = "Toyota";
var car = "Honda";

console.log(car);

// let veg = "tomato"; // Cannot redeclare block-scoped variable 'veg'. (let)
// let veg = "potato";

const nike = "TVS"; // const bike; // 'const' declarations must be initialized.
bike = "TVS"; // const cannot be re-assigned the value
console.log(bike);

// Array & Object
console.log("-------------");
const array = [1, 2, 3, 4];
// array["3"] = 10; // modify the third index value

console.log(array);

// Array methods
let newArr = array.pop(); // 4
console.log(newArr);

let firstElement = array.shift();
console.log(firstElement);

console.log("--------------");

const user = {
  id: 1,
  name: "Rahul",
  age: 22,
};

console.log(user.name);
console.log(user.gender); // undefined

// Arrow Function
console.log("--------------  Arrow Function  ------------------");

// normal function

function add(a, b) {
  console.log(a + b);
  return a - b;
}

let result = add(10, 20); // call add function // expected output = 30
console.log(result); // expected output = -10

// Arrow function
const userData = (name, age) => {
  console.log(`User Name ${name} & ${age}`);
  return age;
};

let age = userData("Rahul", 21); // call userData function // expected output = User Name Rahul & 21
console.log(age); // expected output = 21

const example = (name) => {
  return name;
};

let userName = example("mohan");
console.log(`User Name: ${userName}`);

let obj = (a, b) => `A + B = ${a + b}`;
console.log(obj(20, 30)); // call obj function expected output = 50

// in Arrow function - if the function has one expression we can skip {} and return keyword
