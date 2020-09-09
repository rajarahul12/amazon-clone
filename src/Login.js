import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import { Button, CircularProgress } from "@material-ui/core";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [loader, setLoader] = useState(false);

  const login = (e) => {
    e.preventDefault();
    setShowLoader(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        //logged in
        setShowLoader(false);
        history.push("/");
      })
      .catch((e) => {
        setShowLoader(false);
        alert(e.message);
      });
  };

  const register = (e) => {
    e.preventDefault();
    setLoader(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        //logged in
        setLoader(false);
        history.push("/");
      })
      .catch((e) => {
        setLoader(false);
        alert(e.message);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>
      <div className="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>Email</h5>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
          />
          <h5>Password</h5>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button
            variant="contained"
            onClick={login}
            type="submit"
            className="login__signInButton"
          >
            {!showLoader ? "Sign In" : <CircularProgress />}
          </Button>
        </form>
        <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>
        <Button
          variant="contained"
          onClick={register}
          className="login__registerButton"
        >
          {!loader ? "Create your Amazon Account" : <CircularProgress />}
        </Button>
      </div>
    </div>
  );
}

export default Login;
