/*
Node.js Core modules
- fs  (file system)
- http (create servers)
- os (get System info)
- path (handle file paths)
*/

// const fs = require("fs"); // common JS
import fs from "fs"; // module ES6

fs.writeFileSync("demo.txt", "Hello Node.js"); // Write file (when file not exist then create first then write)

const data = fs.readFileSync("demo.txt", "utf8");
console.log(data);

/*

utf8 -- Standard text (most used)
ascii -- Basic English only
base64 -- Images/binary transfer
hex -- Hexadecimal format

*/
