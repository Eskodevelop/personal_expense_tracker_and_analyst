import React, { useState, useEffect } from "react";
import Header from "../core/Header";
import auth from "./auth-helpers";
import { read, update } from "./api-user";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Button, Alert } from "react-bootstrap";

const alertStyles = {
  marginLeft: "10%",
  marginRight: "10%",
};

/* eslint-disable */

export default function Edit({ match }) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    nickname: "",
    email: "",
    open: false,
    error: "",
    redirectToDashboard: false,
  });
  const jwt = auth.isAuthenticated();
  const { userId } = useParams();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      return window.location.assign("/");
    }

    if (sessionStorage.getItem("googleLogin")) {
      return setValues({
        ...values,
        error: "We can't edit your account since you logged with Google",
      });
    }

    const abortControler = new AbortController();
    const signal = abortControler.signal;

    read({ userId: userId }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          firstName: data.firstName,
          lastName: data.lastName,
          nickname: data.nickname,
          email: data.email,
        });
      }
    });

    return function cleanup() {
      abortControler.abort();
    };
  }, [userId]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickHandler = (e) => {
    const user = {
      firstName: values.firstName || undefined,
      lastName: values.lastName || undefined,
      nickname: values.nickname || undefined,
      email: values.email || undefined,
    };

    update({ userId: userId }, { t: jwt.token }, user).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, redirectToDashboard: true });
        let token = JSON.parse(sessionStorage.getItem("token"));
        token.user.firstName = values.firstName;
        token.user.lastName = values.lastName;
        token.user.nickname = values.nickname;
        token.user.email = values.email;
        sessionStorage.setItem("token", JSON.stringify(token));
      }
    });
  };

  if (values.redirectToDashboard) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="edit">
      <Header name={values.firstName} id={userId} />
      <h2 className="login-main-title">Edit Profile</h2>
      <div className="edit-form">
        <div className="form-outline">
          <input
            type="text"
            id="form12"
            className="form-control"
            placeholder="firstName"
            defaultValue={values.firstName}
            onChange={handleChange("firstName")}
          />
        </div>
        <div className="form-outline">
          <input
            type="text"
            id="form12"
            className="form-control"
            placeholder="lastName"
            onChange={handleChange("lastName")}
            defaultValue={values.lastName}
          />
        </div>
        <div className="form-outline">
          <input
            type="text"
            id="form12"
            className="form-control"
            placeholder="nickname"
            defaultValue={values.nickname}
            onChange={handleChange("nickname")}
          />
        </div>
        <div className="form-outline">
          <input
            type="text"
            id="form12"
            className="form-control"
            placeholder="email"
            onChange={handleChange("email")}
            defaultValue={values.email}
          />
        </div>
        <div>
          {values.error && (
            <Alert style={alertStyles} variant="danger">
              {values.error}
            </Alert>
          )}
        </div>
        <div className="edit-buttons">
          <div className="edit-edit">
            <Button variant="outline-primary" onClick={clickHandler}>
              Edit
            </Button>
          </div>
          <Link to="/dashboard">
            <Button variant="outline-danger">Back</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
