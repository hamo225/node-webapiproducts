module.exports = (temp, product) => {
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
