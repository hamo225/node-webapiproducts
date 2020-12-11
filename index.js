"use strict";
//======================================================
//======================================================
//======================================================
// FILE MANAGEMENT
//
// we store it in the fs variable (can be any variable) which we can use later
// this is how we use a module, we == require it
// once we reqire it we can now can get access to functoins of it to read and write data to the file system.
const fs = require("fs");

// const hello = "Hello world";
// console.log(hello);
// to run the code in the terminal we run node

// we required a new module (fs module)

//========= how to read data from files =================
// readfile sync takes 2 arguments, first the path to the file we are reading and second the character
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

// // we are storing the data from the text file in this variable textIn.
// console.log(textIn);

//======================================================
// how to write data to files
// const textOut = `Hello there, this is a string i put into the data. This is what we know about avocados: ${textIn}.\n Created on ${Date.now()}`;

// // we have now created a new file called output with the text inside it and the date
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File Written");
//======================================================
//This code we wrote to read and save text into a variable - was a syncronous wasy. Each statemetn process line by line. Each line blocks the execution of the next.
// Blocking code
// step 1
// const fs = require("fs");
// step 2
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// step 3
// console.log(textIn);
//
//
//
//Solution is to use Asynchronous non-blocking code
// offload heavy work to be worked on in the background and call back function is then called to handle the result and the rest of the code can execute.

// we can defer reaction in the future to make the code non blocking

// readFile function is asynchronous which accepts callback functions. It will start reading the file in the background and then move on to the nxt statement printing to the console.
// fs.readFile("input.txt", "utf-8", (err, data) => {
//   console.log(data);
// });
// console.log("Reading File...");

//======================================================
// Node js needs to operate around non-blocking I/o model (input/output model)
// we will use many callback functions

// using callbacks doesn always make it asynchronous
// promises and async/await can help with callback hell
//======================================================
// reading and wirting files in asynchronous way
// non blocking

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("/txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("File has been Written");
//       });
//     });
//   });
// });
// console.log("Will read file");
// =================================================================
// =================================================================
// =================================================================
// SERVER MANAGEMENT

// Creating a web server - include a module HTTP - gives us networking capabilites such as building a http server
const http = require("http");

// STEP 1 CREATE SERVER
//each time a new request comes to the server this call back function below will be called - this is how to send back a plain text response when a request comes to the server
// const server = http.createServer((req, res) => {
//   res.end("hello from the server");
// });

// // STEP 2 START SERVER
// // need to assign the server to a variable (server)

// // this will start listening for incoming requests from the client
// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to requests on port 8000");
// });
// =================================================================
// =================================================================
// =================================================================
// ROUTING
// //IMPLEMENTING DIFFERENT ACTIONS FOR DIFFERENT URLS

// // STEP 1 - ANALYSE THE URL - WE NEED TO ADD ANOTHER MODULE - URL
// const url = require("url");

// const server = http.createServer((req, res) => {
//   const pathName = req.url;

//   if (pathName === "/" || pathName === "/overview") {
//     res.end("this is the overview"); //IF OVERVIEW URL ENTERED
//   } else if (pathName === "/product") {
//     res.end("this is the product"); //IF PRODUCT URL ENTERED
//   } else {
//     // headers needs to be set before the response is sent
//     res.writeHead(404, {
//       // THESE ARE WHERE YOU SPECIFY HEADERS
//       "Content-type": "text/html", //INFORMS BROWSER TO EXPECT A HEADER IN HTML
//       "MY-own-header": "hello-world", //WE CAN MAKE OUR OWN HEADERS
//     });
//     res.end("<h1>PAGE NOT FOUND</h1>"); //THE RESPONSE IF NO PAGE FOUND
//   }
// });

// // LISTENING FOR REQUESTS ON THE SERVER
// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to requests on port 8000");
// });

// the url module is used for more complicated applications. It can help pars the specific urls and their codes etc into easy to read objects
//
//
//
//
// =================================================================
// =================================================================
// =================================================================
// APIS
// APIS WILL SEND JSON DATA TO THE CLIENT. SO WE ADD AN ELSE IF TO SHOW A RESPONSE WHEN THE URL CONTAINES /API

// WE READ DATA FROM JSON FILE, PARSE THE JSON DATA USING JS, PASS THE DATA BACK TO TO THE CLIENT/USER

const url = require("url");

// even though this is sychronous it will not be bloccking anything as it only has to be run once so the data is parsed once and does not ahve to be parsed each time a user clicks on going to the API page.
// before anything happens it will read the json file and put the data into variable data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// it will parse the data into an array - productData is an array of the data in the json file
const productData = JSON.parse(data);
//reading the html template overview
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
// reading the product html overview
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
// reading the product-card html
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const replaceTemplate = function (temp, product) {
  // have to wrap the product name as an expression and put g so that all the instances of product name are changed and not just the first one. So this will replace the placeholders with the data in the objects.
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRODUCTNUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%IMAGE%}/g, product.image);

  //here each product has attached to it an organic state but here we say now if the boolean in the object is not organic then we essentially add a class not-organic to the element which displays none so it removes the organic status
  if (!product.organic) {
    output = output.replace(/{%NOTORGANIC%}/g, "not-organic");
  }
  return output;
};

// this server fucntion is called each time there is a request
const server = http.createServer((req, res) => {
  // here we are unpacking an objects data into two variables query and pathname.
  const { query, pathname } = url.parse(req.url, true);

  // THIS IS THE OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    // MAP METHOD ACCEPTS A CALL BACK FUNCTION WHICH GETS AS AN ARGUMENT THE CURRENT ELEMENT OF THE CURRENT LOOP AND WHATEVER IS RETURNED WILL BE SAVED IN AN ARRAY. SO NOW EACH ITERATION WE WANT TO REPLACE THE PLACEHOLDERS
    const cardsHTML = productData
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHTML);
    res.end(output);

    // THIS IS THE PRODUCT PAGE
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    // here we treive the product ID from the pased json data and going into query and id
    const product = productData[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // THIS IS THE API
  } else if (pathname === "/api") {
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   // data is in json. need to parse is
    //   const productData = JSON.parse(data);
    //   //need to tell the browser we are sending back json data
    //   res.writeHead(200, { "Content-type": "application/json" });
    //   // send back the data as a response
    //   res.end(data);
    // });
    //need to tell the browser we are sending back json data
    res.writeHead(200, { "Content-type": "application/json" });
    // send back the data as a response
    res.end(data);

    // THIS IS THE NOT FOUND PAGE 404
  } else {
    // headers needs to be set before the response is sent
    res.writeHead(404, {
      // THESE ARE WHERE YOU SPECIFY HEADERS
      "Content-type": "text/html", //INFORMS BROWSER TO EXPECT A HEADER IN HTML
      "MY-own-header": "hello-world", //WE CAN MAKE OUR OWN HEADERS
    });
    res.end("<h1>PAGE NOT FOUND</h1>"); //THE RESPONSE IF NO PAGE FOUND
  }
});

// LISTENING FOR REQUESTS ON THE SERVER
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
