const express = require("express");
const router = express.Router();
const cb = require("../circuit-breaker-pattern");

const circuitBreaker = new cb(2000, 3); // 5 seconds timeout, allow 3 consecutive failures

router.get("/data", async (req, res) => {
  try {

    
    const result = await circuitBreaker.executeRequest(
      "http://localhost:3001/api/v1/products"
    );
    console.log("Result:", result);
  } catch (error) {
    console.error("Error:", error.message);
  }
});

module.exports = router;
