// Variable declaration, initialization with Type safe
const message: string = "Hello TypeScript";
console.log(message);

let username: string = "Rahul";
let age: number = 22;
age = 24;
console.log(age)
let isActive: boolean = true;

// Array type
let numbers: number[] = [1, 2, 3];
const users: string[] = ["A", "B"];

let nums: Array<number> = [1, 2, 3];
const user: Array<string> = ["a", "b", "c"];

console.log(users)

// Fixed Values 

const user1: [string, number, string] = ["Rahul", 21, "kumar"];
console.log(user1)

let x: any = 20; // Any data type (Avoid if possible)
x = "Rahul";
console.log(x)
console.log(x.trim())

let z: unknown = "Hello"; // Unknown (Safer than any)

// console.log(z.trim())  // 'z' is of type 'unknown'.

if(typeof z === "string"){
    console.log(z.trim())
}

// functions in TypeScript

console.log("------ Function in TypeScript -----")
const add = (a:number, b:number): number => {
    return a + b;
}

let result = add(30, 20);

console.log(result)

// Optional parameters
function greet(name: string, age?: number){
    console.log(name)
}

greet("Rahul");


// Default parameters
function hello(name: string = "Guest"){
    console.log(name)
}

hello('Rahul')

function bye(name: string = "Guest"): string {
    return name
}

function price(num: number): void{
    console.log(num);
}

price(30)

let ans = bye();
console.log(ans)

// Object Type
console.log("------ Object type ------");

const obj: {name: string, age: number, email?: string} = {
    name: "Rahul",
    age: 21
}

console.log(obj)

interface User{
    id?: number,
    name: string,
    age: number,
    isActive?: boolean
}

const user4: User = {
    id: 1,
    name: "Sita",
    age: 21,
    isActive: true
}

console.log(user4)
console.log(typeof user4.isActive)

console.log("----- Type ----")

type user1 = {
    name: string,
    age: number
}

const user5: user1 = {
    name: "Shivam",
    age: 22
}

function printUser(user: User){
    console.log(user.name, user.age);
}
printUser({name: "Amit", age: 25});


interface Bike {
    name: string;
    modal: string;
    number: number
}

const bikes: Bike[] = [
    {name: "Honda", modal: "125cc", number: 2334},
    {name: "TVS", modal: "100",number: 3222}
]

console.log(bikes)


function printBike(bikes: Bike[]){
    bikes.map((bike)=> {
        console.log(bike.name, bike.modal);
    })
}

printBike(bikes)

// Union Types -- Variable can store multiple types.
console.log("------ Union Type -----")

let id: number | string | boolean = 23;
id = "ABC1234";
id = true

function findUser(id: number | string){
    console.log(`Searching Id: ${id}`);
}

findUser(23)

// Literal Types (Restricted Values) -- Allow only specific values.

type status = "success" | "error" | "loading";

let apiStatus: status;

apiStatus = "success";
console.log(apiStatus);

// enum Role {
//     ADMIN,
//     USER,
//     GUEST
// }


enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    GUEST = "GUEST"
}

let userRole: Role = Role.USER;

console.log(userRole)

interface NewUser{
    name: string,
    role: Role
}

const newUser: NewUser = {
    name: "Rahul",
    role: Role.GUEST
}

// Enum inside Function
 enum Status {
    SUCCESS = "SUCCESS",
    FAIL = "FAIL"
 }

function checkStatus(status: Status){
    if(status === Status.SUCCESS){
        console.log("Request Success");
    }
}

checkStatus(Status.SUCCESS)


// Generic --> A type that is decided later
// instead of fixing a type (string, number, ...) , wemake the function flexible

function indentity(value: any): any{
    return value;
}

const num = indentity(20);
const text = indentity("25");
console.log(num);
console.log(text)

// Any removes type safety
function identification <T>(value: T): T{
    return value;
}

const first = identification<number>(20);
const second = identification<string>("30");

console.log(second)


function withoutReturn <type>(value: type): void{
    console.log("Generic ", value)
}

withoutReturn<number>(30);
withoutReturn<boolean>(false);
