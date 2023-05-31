const axios = require("axios");

class CircuitBreaker {
  constructor ( timeoutDuration, failureThreshold, pollingInterval ) {
    this.pollingInterval = pollingInterval; // Time interval for the circuit breaker to check if the external service is back online
    this.state = "CLOSED"; // Initial state of the circuit breaker
    this.failureCount = 0; // Number of consecutive failures
    this.failureThreshold = failureThreshold; // Maximum number of failures allowed
    this.timeoutDuration = timeoutDuration; // Time duration for the circuit breaker to wait before trying again
    this.nextAttempt = null; // Timestamp for the next allowed request
  }

  async executeRequest(url) {
    console.log("current circuit state", this.state);
    if (this.state === "OPEN") {
      console.log(Date.now() >= this.nextAttempt);
      if (Date.now() >= this.nextAttempt) {
        // If the state is OPEN, check if the next attempt time has passed
        this.state = "HALF_OPEN"; // Move to HALF_OPEN state
      } else {
        console.log("circuit breaker is open");
        throw new Error("Circuit breaker is open");
      }
    }

    try {
      console.log("Making request");
      const response = await axios.get(url); // Make the actual request
      this.failureCount = 0; // Reset failure count if request succeeds

      this.state = "CLOSED"; // Move to CLOSED state
      return response.data;
    } catch (error) {
      this.failureCount++; // Increment failure count on request failure
      console.log(this.failureCount, this.failureThreshold);
      if (this.failureCount >= this.failureThreshold) {
        this.state = "OPEN"; // Move to OPEN state
        this.nextAttempt = Date.now() + this.timeoutDuration; // Set the next attempt time
      }

      throw error;
    }
  }
}

module.exports = CircuitBreaker;
