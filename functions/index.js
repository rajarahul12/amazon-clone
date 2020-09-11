const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HPuCnEo7NoTqqusr9bHkxfBVWeDYVRP6szmG8YSJpBPzfSYLjdlUq8PbdG5v8wtWtAcmF1RGOTG3W4TQk5YBKhI000zdbiOkh"
);

//API

// App config
const app = express();

//Middlewares
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());

//API Routes
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment request recieved boom >>>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //sub units
    currency: "INR",
  });
  console.log("Payemnt -> ", paymentIntent);
  res.status(201).json({
    clientSecret: paymentIntent.client_secret,
  });
});

//Lister
exports.api = functions.https.onRequest(app);
