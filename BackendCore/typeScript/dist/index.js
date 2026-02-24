"use strict";
// Variable declaration, initialization with Type safe
const message = "Hello TypeScript";
console.log(message);
let username = "Rahul";
let age = 22;
age = 24;
console.log(age);
let isActive = true;
// Array type
let numbers = [1, 2, 3];
const users = ["A", "B"];
let nums = [1, 2, 3];
const user = ["a", "b", "c"];
console.log(users);
// Fixed Values 
const user1 = ["Rahul", 21, "kumar"];
console.log(user1);
let x = 20; // Any data type (Avoid if possible)
x = "Rahul";
console.log(x);
console.log(x.trim());
let z = "Hello"; // Unknown (Safer than any)
// console.log(z.trim())  // 'z' is of type 'unknown'.
if (typeof z === "string") {
    console.log(z.trim());
}
// functions in TypeScript
console.log("------ Function in TypeScript -----");
const add = (a, b) => {
    return a + b;
};
let result = add(30, 20);
console.log(result);
// Optional parameters
function greet(name, age) {
    console.log(name);
}
greet("Rahul");
// Default parameters
function hello(name = "Guest") {
    console.log(name);
}
hello('Rahul');
function bye(name = "Guest") {
    return name;
}
function price(num) {
    console.log(num);
}
price(30);
let ans = bye();
console.log(ans);
// Object Type
console.log("------ Object type ------");
const obj = {
    name: "Rahul",
    age: 21
};
console.log(obj);
const user4 = {
    id: 1,
    name: "Sita",
    age: 21,
    isActive: true
};
console.log(user4);
console.log(typeof user4.isActive);
console.log("----- Type ----");
const user5 = {
    name: "Shivam",
    age: 22
};
function printUser(user) {
    console.log(user.name, user.age);
}
printUser({ name: "Amit", age: 25 });
const bikes = [
    { name: "Honda", modal: "125cc", number: 2334 },
    { name: "TVS", modal: "100", number: 3222 }
];
console.log(bikes);
function printBike(bikes) {
    bikes.map((bike) => {
        console.log(bike.name, bike.modal);
    });
}
printBike(bikes);
// Union Types -- Variable can store multiple types.
console.log("------ Union Type -----");
let id = 23;
id = "ABC1234";
id = true;
function findUser(id) {
    console.log(`Searching Id: ${id}`);
}
findUser(23);
let apiStatus;
apiStatus = "success";
console.log(apiStatus);
// enum Role {
//     ADMIN,
//     USER,
//     GUEST
// }
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
    Role["GUEST"] = "GUEST";
})(Role || (Role = {}));
let userRole = Role.USER;
console.log(userRole);
const newUser = {
    name: "Rahul",
    role: Role.GUEST
};
// Enum inside Function
var Status;
(function (Status) {
    Status["SUCCESS"] = "SUCCESS";
    Status["FAIL"] = "FAIL";
})(Status || (Status = {}));
function checkStatus(status) {
    if (status === Status.SUCCESS) {
        console.log("Request Success");
    }
}
checkStatus(Status.SUCCESS);
// Generic --> A type that is decided later
// instead of fixing a type (string, number, ...) , wemake the function flexible
function indentity(value) {
    return value;
}
const num = indentity(20);
const text = indentity("25");
console.log(num);
console.log(text);
// Any removes type safety
function identification(value) {
    return value;
}
const first = identification(20);
const second = identification("30");
console.log(second);
function withoutReturn(value) {
    console.log("Generic ", value);
}
withoutReturn(30);
withoutReturn(false);
