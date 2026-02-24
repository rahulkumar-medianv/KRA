import path from "path"; // import path
// the Path module helps you work file and folder locations
import { fileURLToPath } from "url";

// recreate file
const filename = fileURLToPath(import.meta.url);

const dirname = path.dirname(filename);
path.join(dirname, "files", "demo.txt");

console.log(filename);
console.log(dirname);

console.log(path.basename(filename)); // base file output = path.js
console.log(path.extname(filename)); // output = .js
