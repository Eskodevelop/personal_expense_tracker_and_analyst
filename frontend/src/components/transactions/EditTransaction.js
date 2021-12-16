import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router";
import Header from "../core/Header";
import { read, update } from "./api-transaction";
import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

/* eslint-disable */ 

export default function EditTransaction() {
  const [user, setUser] = useState({});

  const { transactionId } = useParams();

  const [values, setValues] = useState({
    title: "",
    amount: 0,
    currency: "",
    type: "",
    objectId: user,
    open: false,
    error: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      return window.location.assign("/");
    }

    let temp = JSON.parse(sessionStorage.getItem("token"));
    let tempUser = temp.user;

    setUser(tempUser);

    read({ transactionId: transactionId }).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: data.title,
          amount: data.amount,
          currency: data.currency,
          type: data.type,
          objectId: data.objectId,
        });
      }
    });
  }, [transactionId]);

  const clickHandler = (e) => {
    const transaction = {
      title: values.title || undefined,
      amount: values.amount || undefined,
      currency: values.currency || undefined,
      type: values.type || undefined,
      objectId: values.objectId || undefined,
    };

    update({ transactionId: transactionId }, transaction).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, open: true });
      }
    });
  };

  const { open } = values;

  if (open) {
    return <Navigate to="/transactions/daily" />;
  }

  return (
    <div>
      <Header name={user.firstName} id={user._id} />

      <div className="edit-transaction">
        <h2 className="et-title">Edit Transactions</h2>
        <div className="et-main">
          <div className="form-outline">
            <input
              type="text"
              id="form12"
              className="form-control"
              onChange={handleChange("title")}
              defaultValue={values.title}
            />
          </div>
          <div
            className="form-outline"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <input
              type="number"
              id="form12"
              className="form-control"
              placeholder="amount"
              onChange={handleChange("amount")}
              style={{ width: "100%" }}
              value={values.amount}
            />

            <input
              className="dashboard-input"
              type="search"
              list="mylist"
              onChange={handleChange("currency")}
              defaultValue={values.currency}
              style={{ width: "30%", height: "40px" }}
            />
            <datalist id="mylist">
              <option value="BAM" />
              <option value="$" />
              <option value="€" />
            </datalist>
          </div>

          {values.error && (
            <Alert
              variant="danger"
              style={{ marginLeft: "10%", marginRight: "10%" }}
            >
              {values.error}
            </Alert>
          )}

          <div className="et-buttons">
            <Button variant="outline-primary" onClick={clickHandler}>
              EDIT
            </Button>
            <Link to="/transactions/daily">
              <Button variant="outline-danger">BACK</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
