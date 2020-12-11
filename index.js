"use strict";

const fs = require("fs");
// Creating a web server - include a module HTTP - gives us networking capabilites such as building a http server
const http = require("http");
const url = require("url");
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
