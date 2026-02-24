import { add, multiply } from "./math.js";
import even from "./share.js";
let result = add(10, 20);
console.log(result);

multiply(20, 2);
console.log(even);
/*
 A module is simply a javascript file that can share code with another file.

 - Better code organization
 - reusable functions
 - Avoid global variables

 Export - sharing code - make variables/ functions available outside the file.

 Named Export -> Normal export



*/
