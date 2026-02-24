// this keyword, class and object

console.log("--------- This keyword --------");
const userObj = {
  name: "Rahul",
  age: 21,
  userData: function (name, age) {
    name = this.name;
    age = this.age;
    console.log(`User name ${name} age ${age}`);
  },
}; // In userObj object have userData function (function expression)

userObj.userData(); // call the userData function inside have userObj object

const bioData = {
  id: 1,
  name: "Vikram",
  email: "vikram@gmail.com",
  gender: "Male",

  data: (name, email) => {
    name = this.name;
    email = this.email;
    console.log(`User Bio Data ${name} & ${email}`);
  },

  newData() {
    const bio = () => {
      console.log(`Bio ${this.name} & ${this.email}`);
    };
    bio(); // normal function inside have arrow function
  },
};

bioData.userInfo = () => {
  console.log(`User Bio Data ${bioData.name} & ${bioData.email}`);
};

bioData.newData();
bioData.userInfo();

bioData.data(); // expected output is User Bio Data undefined & underfined *** solve using refrence and (normal function + arrow function)

console.log("---------- Classes & Constructor ----------");

class User {
  name = "Rahul"; // without constructor it will create a automcatically a empty constructor
}

let user = new User();
console.log(user.name); // expected output = Rahul

// Constructor -- A constructor is a special function inside a class that runs automatically when an object is created

// class - class is a blue print use to create a object

class Bike {
  constructor(name, modal) {
    this.name = name;
    this.modal = modal;
  }
}

const honda = new Bike("Honda", "125cc");
const TVS = new Bike("TVS", "100cc");

console.log(honda);
console.log(TVS);

// Car class

class Car {
  constructor(name, modal) {
    this.name = name;
    this.modal = modal;
  }
}

const toyota = {
  name: "toyota",
  modal: "r15",
};

const car1 = new Car(toyota.name, toyota.modal);
console.log(car1);
