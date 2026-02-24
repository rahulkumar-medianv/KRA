// Destructuring - extract the object

console.log("------- Object Destructuring -------");
const user = {
  name: "Rahul",
  email: "rahul@gmail.com",
};

let userName = user.name;
console.log("User Name: " + userName);

const { name = "Vishal", email, phone = "+91 7320810579" } = user; // Object destructuring (cleaner, shorter, easy to read)
console.log(name);
console.log("User Phone Numer: " + phone);

// Arrow function + Object Destructuring
const userData = ({ name, email }) => {
  console.log(`User Name ${name} ${email}`);
};

userData(user); // call the userData function

function bioData({ name = "Vimal", email = "vimal@gmail.com" }) {
  console.log(`User Bio Data ${name} & ${email}`);
  return `Return User Bio Data ${name} & ${email}`;
}
let result = bioData(user);
console.log(result);

// Array Destructuring
console.log("---------- Array Destructuring --------");

const arr = [1, 2, 3, 4, 5, 6];
console.log(arr);
console.log(arr[0]);
console.log(arr[2]);
const [a, b] = arr; // Array Destructuring converting the array elements in a variables
console.log(b);

const array = ([a, b, c = 20]) => a + b + c;

const ans = array(arr); // pass the arr
console.log(ans);

/*

Optional Chaining (?.)
spread Operator (...) expand 
Rest Operator (...) // collect

(Spread & Rest look same but behave differenctly)

*/

console.log("------ Optional Chaining ----");

// when in object the key not found so it will give the output as undefined
const bike = {
  name: "Honda",
  modal: "125cc",
  address: {
    city: "Gaya",
    pincode: 823003,
  },
};

console.log(bike?.name); // expected output = Honda

console.log("------ Spread & Rest Operator ------");

const num = [1, 2, 3, 4];
console.log(...num); // expand the num array
const num1 = [5, 6, 7];
console.log(...num, ...num1);

const veg = ["potato", "tomato", "Carrot"];
const [potato, ...rest] = veg;
console.log(rest[0]); // expected output = tomato

console.log(rest); // expected output [tomato', 'Carrot']
console.log(...rest[0]); // expected output t o m a t o

const vegFun = ([potato, ...vegs]) => {
  console.log(vegs);
};
vegFun(veg);
