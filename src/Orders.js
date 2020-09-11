import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import Order from "./Order";
import { useHistory } from "react-router-dom";
import { Button, CircularProgress } from "@material-ui/core";

function Orders() {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      setLoading(true);
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setLoading(false);
          return setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      {/* {!user ? history.push("/") : true} */}
      {user ? <h1>Your Orders</h1> : null}
      {user ? (
        loading ? (
          <div className="orders__loader">
            <CircularProgress />
          </div>
        ) : (
          <div className="orders__order">
            {orders?.map((order) => (
              <Order order={order} />
            ))}
          </div>
        )
      ) : (
        <div className="order__signin">
          <p>Sign in to view your orders</p>
          <Button onClick={(e) => history.push("/login")}>Sign In</Button>
        </div>
      )}
    </div>
  );
}

export default Orders;
