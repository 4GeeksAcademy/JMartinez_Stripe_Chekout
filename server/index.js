const express = require("express");
const Stripe = require("stripe");
// const stripe = new Stripe("<your_secretkey_here>");

const cors = require("cors");
const { error } = require("console");
const { isNativeError } = require("util/types");

const app = express();

const stripe = new Stripe('sk_test_51Nsr4fKXj5LWRngy31gxXDgOiRztmNpiBBmqDpLBRuqDHNdfDIbOG9aT56ZppZYviuhqit7eKlKFZnjmFwxgiyjZ00Jvx3IxRM');

app.use(cors({origin:'https://redesigned-giggle-jv7577j5x9g25669-3000.app.github.dev/'}))


app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  // you can get more data to find in a database, and so on
try{
  const { id, amount } = req.body;

  const payment = await stripe.paymentIntents.create({
    amount,
    currency: "USD",
    description: "Gaming Keyboard",
    payment_method: id,
    confirm: true, //confirm the payment at the same time
    "automatic_payment_methods[enabled]":true,   
    "automatic_payment_methods[allow_redirects]": "never",

  });

  res.send({message: "succesfull payment"})
}catch(error){
  console.log(error)
  res.json({message: error})
}

})


   

app.listen(3001, () => {
  console.log("Server on port", 3001);
});
