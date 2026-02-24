/*
Asynchronous programming handled api calls, database requests, timers, file loading

- javascript is a single - threaded (run one task at a time)

*/

console.log("Start");

setTimeout(() => {
  console.log("Timer 0");
}, 0);

Promise.resolve().then(() => {
  console.log("resolve");
});

Promise.reject()
  .then(() => {
    console.log("Resolve");
  })
  .catch(() => {
    console.log("Promise Rejected");
  });

console.log("End");

/*
expected output: 
start
end
Timer 0

-- here setTimeout will go to the Web API timer handled outside JS - after timer finishes callback moves to callback queue then event loop change is call stack empty ?
if yes push callback into stack
*/

const person = new Promise((res, rej) => {
  let isActive = true;
  if (isActive) return res("Promise resolve 2");
  if (!isActive) return rej("Promise Rejected 2");
});

person
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

// normal arrow function
const add = (a, b) => console.log(`Add A + B ${a + b}`);

add(10, 20);

// async arrow function

const multiply = async (a, b) => console.log(`Multiply A * B ${a * b}`);

await multiply(20, 30);
