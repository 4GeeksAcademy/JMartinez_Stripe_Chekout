import React from "react";
import "bootswatch/dist/lux/bootstrap.min.css";
import "./App.css";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";

const stripePromise = loadStripe("pk_test_51Nsr4fKXj5LWRngyICcySMhyijuGZpNBAj1mAEgpVe96QSXP0c3wT3W2kA7T1nzikklh0UqthqmLvYqh7JY9Si4O00Bkpvecrd");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  // const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    // setLoading(true);

    if (!error) {
    
      console.log(paymentMethod)
      const { id } = paymentMethod;
    
        const { data } = await axios.post(
          'https://redesigned-giggle-jv7577j5x9g25669-3001.app.github.dev/api/checkout',
          {
            id,
            amount: 20000, //cents
          }
        );
        console.log(data);

       
      } 
  
  };


  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      {/* Product Information */}
      <img
        src="https://th.bing.com/th/id/R.634be73d9a683c71114c8e23cd4fc6bf?rik=vJA537XKFoDgeA&pid=ImgRaw&r=0"
        alt="Corsair Gaming Keyboard RGB"
        className="img-fluid"
      />

      <h3 className="text-center my-2">Price: 100$</h3>

      {/* User Card Input */}
      <div className="form-group">
        <CardElement />
      </div>

      <button disabled={!stripe} className="btn btn-success">
        buy
        {/* {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          "Buy"
        )} */}
      </button>
    </form>
  );
};

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row h-100">
          <div className="col-md-4 offset-md-4 h-100">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default App;
