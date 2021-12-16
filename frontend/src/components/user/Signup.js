import React, { useState } from "react";
import LoginHeader from "../core/LoginHeader";
import { create } from "./api-user";
import { Navigate, Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

const alertStyles = {
  marginLeft: "10%",
  marginRight: "10%",
};

/* eslint-disable */

export default function Signup() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    nickname: "",
    email: "",
    password: "",
    repeatPassword: "",
    open: false,
    error: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickHandler = () => {
    const user = {
      firstName: values.firstName || undefined,
      lastName: values.lastName || undefined,
      nickname: values.nickname || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    if (user.password !== values.repeatPassword) {
      return setValues({ ...values, error: "Passwords don't match!" });
    }

    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };

  const { open } = values;

  if (open) {
    return <Navigate to="/" />;
  }

  return (
    <div className="signup">
      <LoginHeader />
      <div className="signup-form">
        <h2 className="login-main-title">Register</h2>
        <div className="form-outline">
          <input
            type="text"
            id="form12"
            className="form-control"
            placeholder="First Name"
            onChange={handleChange("firstName")}
          />
        </div>
        <div className="form-outline">
          <input
            type="text"
            id="form12"
            className="form-control"
            placeholder="Last Name"
            onChange={handleChange("lastName")}
          />
        </div>
        <div className="form-outline">
          <input
            type="text"
            id="form12"
            className="form-control"
            placeholder="Nickname"
            onChange={handleChange("nickname")}
          />
        </div>
        <div className="form-outline">
          <input
            type="text"
            id="form12"
            className="form-control"
            placeholder="Email"
            onChange={handleChange("email")}
          />
        </div>
        <div className="form-outline">
          <input
            type="password"
            id="form12"
            className="form-control"
            placeholder="Password"
            onChange={handleChange("password")}
          />
        </div>
        <div className="form-outline">
          <input
            type="password"
            id="form12"
            className="form-control"
            placeholder="Repeat Password"
            onChange={handleChange("repeatPassword")}
          />
        </div>
        <div>
          {values.error && (
            <Alert style={alertStyles} variant="danger">
              {values.error}
            </Alert>
          )}
        </div>
        <div className="signup-buttons">
          <div className="signup-signup">
            <Button variant="outline-primary" onClick={clickHandler}>
              Sign Up
            </Button>
          </div>
          <div className="signup-buttons-back">
            <Link to="/">
              <Button variant="outline-danger">Back</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
