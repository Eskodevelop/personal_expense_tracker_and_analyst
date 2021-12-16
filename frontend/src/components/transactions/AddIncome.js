import React, { useState, useEffect } from "react";
import Header from "../core/Header";
import AddMenu from "./AddMenu";
import { Button, Alert } from "react-bootstrap";
import { create, list } from "./api-transaction";
import { Navigate } from "react-router";

/* eslint-disable */

export default function AddIncome() {
  const [user, setUser] = useState({});

  const [values, setValues] = useState({
    title: "",
    amount: 0,
    currency: "",
    type: "income",
    objectId: user,
    open: false,
    error: "",
  });

  const [data, setData] = useState([]);

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
    setValues({ ...values, objectId: tempUser });

    list().then((values, error) => {
      if (error) {
        setError(error);
      } else {
        let response = [];
        let i = 0;
        values.map((value, index) => {
          if (value.objectId._id == tempUser._id) {
            response[i] = value;
            i++;
          }
        });
        setData(response);
      }
    });
  }, []);

  const clickHandler = (e) => {
    const transaction = {
      title: values.title || undefined,
      amount: values.amount || undefined,
      currency: values.currency || undefined,
      type: values.type || undefined,
      objectId: values.objectId || undefined,
    };

    let same = false;

    data.map((v, i) => {
      if (v.title === transaction.title) {
        same = true;
        setValues({
          ...values,
          error: "You've already used that transactions name!",
          open: false,
        });
      }
    });

    if (same) return;

    create(transaction).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
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
      <AddMenu />

      <div className="income-form">
        <div className="form-outline">
          <input
            type="text"
            id="form12"
            className="form-control"
            placeholder="title"
            onChange={handleChange("title")}
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
          />

          <input
            className="dashboard-input"
            type="search"
            list="mylist"
            onChange={handleChange("currency")}
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

        <div className="if-buttons">
          <Button variant="outline-primary" onClick={clickHandler}>
            SAVE
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => window.location.assign("/transactions/daily")}
          >
            BACK
          </Button>
        </div>
      </div>
    </div>
  );
}
