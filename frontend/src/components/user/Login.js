import React, { useState, useEffect } from "react";
import LoginHeader from "../core/LoginHeader";
import { Button } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { signin } from "./api-auth";
import auth from "./auth-helpers";
import GoogleLogin from "react-google-login";
import axios from "axios";

const alertStyles = {
  marginLeft: "10%",
  marginRight: "10%",
};

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      window.location.assign("/dashboard");
    }
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const login = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const signinGoogle = (response) => {
    const token = response.tokenObj.access_token;
    const id = response.profileObj.googleId;
    const firstName = response.profileObj.givenName;
    const lastName = response.profileObj.familyName;
    const email = response.profileObj.email;
    const nickname = firstName + lastName;

    const user = {
      token: token,
      user: {
        _id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        nickname: nickname,
      },
    };

    console.log(response);

    axios
      .post("http://localhost:5000/api/cache", {
        _id: id,
        firstName: firstName,
        email: email,
        lastName: lastName,
        nickname: nickname,
      })
      .then((response) => console.log(response));

    fetch("http://localhost:5000/api/cache", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: user.user,
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("googleLogin", true);

    window.location.assign("/dashboard");
  };

  const { redirectToReferrer } = values;

  if (redirectToReferrer) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="login">
      <LoginHeader />
      <div className="login-main">
        <h2 className="login-main-title">Login</h2>
        <div className="login-main-form">
          <div className="form-outline">
            <input
              type="text"
              id="form12"
              className="form-control"
              placeholder="email"
              onChange={handleChange("email")}
            />
          </div>
          <div className="form-outline">
            <input
              type="password"
              id="form12"
              className="form-control"
              onChange={handleChange("password")}
              placeholder="password"
            />
          </div>
          <div className="login-login">
            <Button variant="outline-primary" onClick={login}>
              Login
            </Button>
          </div>
          <div>
            {values.error && (
              <Alert style={alertStyles} variant="danger">
                {values.error}
              </Alert>
            )}
          </div>
          <div className="login-signup">
            <p className="login-signup-p">Need Account? </p>
            <Link to="/signup">
              <Button variant="outline-primary">Sign Up</Button>
            </Link>
            <div>
              <GoogleLogin
                clientId="1089234590403-7ear4pqjb2456mtg2rsj38kct6dp3vsb.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={signinGoogle}
                onFailure={(response)=>console.log(response)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
