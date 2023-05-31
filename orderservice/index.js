const app = require("express")();
app.listen(3002, () => console.log("order service listening on port 3002"));

app.post("/api/v1/order/create", (req, res) => {
  console.log("order creation started");
  res.status(200).send({
    message: "order created successfully",
  });
});





