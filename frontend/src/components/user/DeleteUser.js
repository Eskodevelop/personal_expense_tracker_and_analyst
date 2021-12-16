import React, { useState, useEffect } from "react";
import { read, remove } from "./api-user";
import { list, remove as removeTrans } from "../transactions/api-transaction";
import { Navigate } from "react-router";
import authHelpers from "./auth-helpers";
import {
  Alert,
  Button,
  Modal,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import crypto from "crypto";
import Header from "../core/Header";

/* eslint-disable */

const alertStyles = {
  marginLeft: "10%",
  marginRight: "10%",
};

export default function DeleteUser() {
  const [values, setValues] = useState({
    password: "",
    error: "",
    redirect: false,
  });
  const [hashed_password, setHashed_password] = useState("");
  const [salt, setSalt] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { userId } = useParams();
  const jwt = authHelpers.isAuthenticated();
  const [transactionsIds, setTransactionsIds] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      return window.location.assign("/");
    }

    if (sessionStorage.getItem("googleLogin")) {
      return setValues({
        ...values,
        error: "We can't delete your account since you logged with Google",
      });
    }

    let tempTransIds = [];
    let j = 0;

    list().then((response) => {
      response.map((v, i) => {
        if (v.objectId._id === userId) {
          tempTransIds[j] = v._id;
          j++;
        }
      });
    });

    setTransactionsIds(tempTransIds);

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

  const handleChange = (e) => {
    setValues({ ...values, password: e.target.value });
  };

  const clickHandler = (e) => {
    const user = {
      password: values.password || undefined,
    };

    if (values.password === "") {
      return setValues({
        ...values,
        error: "Please Enter Your Password!",
      });
    }

    if (
      hashed_password !==
      crypto.createHmac("sha1", salt).update(values.password).digest("hex")
    ) {
      return setValues({
        ...values,
        error: "Your Password isn't correct!",
      });
    }

    setIsOpen(true);
  };

  const deleteHandler = (e) => {
    remove({ userId: userId }, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        transactionsIds.map((id, i) => {
          removeTrans({ transactionId: id }).then((data) => {
            if (data && data.error) {
              console.log(data.error);
            } else {
              console.log("transaction deleted");
            }
          });
        });
        authHelpers.clearToken(() => console.log("deleted"));
        setValues({ ...values, redirect: true });
      }
    });
  };

  const { redirect } = values;

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="delete">
      <Header id={userId} />
      <h2 className="login-main-title">Delete Account</h2>

      <div className="delete-main">
        <div className="form-outline">
          <input
            type="password"
            id="form12"
            className="form-control"
            placeholder="Enter Your Password..."
            onChange={handleChange}
          />
        </div>
        <div>
          {values.error && (
            <Alert style={alertStyles} variant="danger">
              {values.error}
            </Alert>
          )}
        </div>
        <div className="delete-buttons">
          <div className="delete-delete">
            <Button variant="outline-primary" onClick={clickHandler}>
              Delete
            </Button>
          </div>
          <Link to="/dashboard">
            <Button variant="outline-danger">Back</Button>
          </Link>
        </div>
      </div>
      <div>
        <Modal show={isOpen} onHide={clickHandler} style={{ margin: "10%" }}>
          <ModalTitle>Delete Account</ModalTitle>
          <ModalBody>Are You sure you want to delete your account?</ModalBody>
          <ModalFooter>
            <Button variant="outline-primary" onClick={deleteHandler}>
              Delete
            </Button>
            <Button variant="outline-danger" onClick={() => setIsOpen(false)}>
              Back
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
