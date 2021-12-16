import React, { useState, useEffect } from "react";
import Header from "../core/Header";
import { read, update } from "./api-user";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Button, Alert } from "react-bootstrap";
import authHelpers from "./auth-helpers";
import crypto from "crypto";

const alertStyles = {
  marginLeft: "10%",
  marginRight: "10%",
};

/* eslint-disable */

export default function EditPassword() {
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
    redirect: false,
    error: "",
  });
  const [hashed_password, setHashed_password] = useState("");
  const [salt, setSalt] = useState("");
  const { userId } = useParams();
  const jwt = authHelpers.isAuthenticated();

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
        console.log(data.error);
      } else {
        setHashed_password(data.hashed_password);
        setSalt(data.salt);
      }
    });

    return function cleanup() {
      abortControler.abort();
    };
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickHandler = (e) => {
    const user = {
      password: values.newPassword || undefined,
    };

    if (
      hashed_password !==
      crypto.createHmac("sha1", salt).update(values.oldPassword).digest("hex")
    ) {
      return setValues({
        ...values,
        error: "Your Old Password isn't correct!",
      });
    }

    if (values.newPassword !== values.repeatPassword) {
      return setValues({ ...values, error: "Passwords don't match" });
    }

    update({ userId: userId }, { t: jwt.token }, user).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, redirect: true });
      }
    });
  };

  if (values.redirect) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="edit-password">
      <Header id={userId} />
      <div className="edit-password-form">
        <h2 className="login-main-title">Edit Password</h2>
        <div className="form-outline">
          <input
            type="password"
            id="form12"
            className="form-control"
            onChange={handleChange("oldPassword")}
            placeholder="Old Password..."
          />
        </div>
        <div className="form-outline">
          <input
            type="password"
            id="form12"
            className="form-control"
            onChange={handleChange("newPassword")}
            placeholder="New Password..."
          />
        </div>
        <div className="form-outline">
          <input
            type="password"
            id="form12"
            className="form-control"
            onChange={handleChange("repeatPassword")}
            placeholder="Repeat Password..."
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
