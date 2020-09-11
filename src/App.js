import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { ToastProvider } from "react-toast-notifications";
import SearchProducts from "./SearchProducts";
import Payment from "./Payment";
import Orders from "./Orders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentNew from "./PaymentNew";

const promise = loadStripe(
  "pk_test_51HPuCnEo7NoTqqusCx3eB7c7qTsapXKw15MshI4XePeBnqOHInBIKiHUtYTVpnwQq53x1jtdUpxDlhGmo7HGVAFl00nRV2jT0Q"
);

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ToastProvider>
      <Router>
        <div className="app">
          <Switch>
            <Route path="/orders">
              <Header />
              <Orders />
            </Route>
            <Route path="/checkout">
              <Header />
              <Checkout />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/search">
              <Header />
              <SearchProducts />
            </Route>
            <Route path="/payment">
              <Header />
              <Elements stripe={promise}>
                <PaymentNew />
              </Elements>
              {/* <Elements stripe={promise}>
                <Payment />
              </Elements> */}
            </Route>
            <Route path="/">
              <Header />
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
