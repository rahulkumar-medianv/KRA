import http from "http"; // import http for create node.js server

const server = http.createServer((req, res) => {
  //   res.write("server is running");
  //   res.end();

  // url end points
  if (req.url == "/") {
    res.write("This is Test Route");
    res.end();
  } else if (req.url == "/home") {
    res.write("This is Home Page");
    res.end();
  } else if (req.url == "/profile") {
    res.write("This is profile Page");
    res.end();
  } else {
    res.write("URL Not Found Please Try Again");
    res.end();
  }
});

const PORT = 3000; // PORT
server.listen(PORT, () => {
  console.log(`Server is Running on Port: ${PORT}`);
});
