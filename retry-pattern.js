const axios = require("axios");
const retry = require("retry");

// Define the operation to be retried
const operation = retry.operation({
  retries: 3, // Retry up to 3 times
  factor: 2, // Exponential backoff factor
  minTimeout: 1000, // Minimum delay between retries (in milliseconds)
});

// Make an API request with retry logic
operation.attempt((currentAttempt) => {
  axios
    .get("https://api.example.com/data")
    .then((response) => {
      // Handle successful response
      console.log("Data:", response.data);
    })
    .catch((error) => {
      if (operation.retry(error)) {
        console.log(
          `Retrying - attempt ${currentAttempt}/${operation._options.retries}`
        );
        return;
      }
      console.error("Failed to retrieve data:", error);
    });
});
