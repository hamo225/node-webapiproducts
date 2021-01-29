"use strict";
// require modules at the top
const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

// read and parse Json data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

//reading the html template pages
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

// Create the Server. This function is now called each time there is a request.
const server = http.createServer((req, res) => {
  // Destructuring to unpack the query and pathname url data into two variables
  const { query, pathname } = url.parse(req.url, true);

  // Routing
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
    const product = productData[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // THIS IS THE API
  } else if (pathname === "/api") {
    //headers to tell the browser we are sending back json data
    res.writeHead(200, { "Content-type": "application/json" });
    // send back the data as a response
    res.end(data);
  } else {
    // headers needs to be set before the response is sent
    res.writeHead(404, {
      // THESE ARE WHERE YOU SPECIFY HEADERS
      "Content-type": "text/html", //INFORMS BROWSER TO EXPECT A HEADER IN HTML
      // "MY-own-header": "hello-world", //WE CAN MAKE OUR OWN HEADERS
    });
    res.end("<h1>PAGE NOT FOUND</h1>"); //THE RESPONSE IF NO PAGE FOUND
  }
});

// LISTENING FOR REQUESTS ON THE SERVER
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
