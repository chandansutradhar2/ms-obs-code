const express = require("express");
const app = express();
//const circuitBreaker = require( 'opossum' );
// const options = {
//   timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
//   errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
//   resetTimeout: 30000, // After 30 seconds, try again.
// };
// const breaker = new CircuitBreaker(asyncFunctionThatCouldFail, options);
// breaker.fire( x, y ).then( console.log ).catch( console.error );

// async function asyncFunctionThatCouldFail(x, y) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (x === 2) {
//         reject(new Error("I hate the number 2"));
//       } else {
//         resolve(x + y);
//       }
//     }, 1000);
//   });
// }

app.use(express.json());

app.get("/api/v1/products", (req, response) => {
  return response.send("heello world");
});

app.post("/api/v1/products/addToCart", (req, res) => {
  console.log("add to cart started");

  res.status(200).send({
    message: "added to cart successfully",
  });
});

app.listen(3001, () => {
  console.log("product service listening on port 3001");
});
