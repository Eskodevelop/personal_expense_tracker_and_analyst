import React, { useState, useEffect } from "react";
import Header from "../core/Header";
import AddMenu from "./AddMenu";
import { Button, Alert } from "react-bootstrap";
import { create, list } from "./api-transaction";
import { Navigate } from "react-router";
import axios from "axios";

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

  const currencyChange = (e) => {
    if (values.currency === "") {
      setValues({ ...values, currency: e.target.value });
    }

    if (e.target.value === "BAM") {
      if (values.currency === "BAM") {
        return;
      } else if (values.currency === "$") {
        setValues({
          ...values,
          currency: "BAM",
          amount: parseFloat(values.amount * 1.69).toFixed(2),
        });
      } else if (values.currency === "€") {
        setValues({
          ...values,
          currency: "BAM",
          amount: parseFloat(values.amount * 1.96).toFixed(2),
        });
      }
    } else if (e.target.value === "$") {
      if (values.currency === "BAM") {
        setValues({
          ...values,
          currency: "$",
          amount: parseFloat(values.amount * 0.59).toFixed(2),
        });
      } else if (values.currency === "$") {
        return;
      } else if (values.currency === "€") {
        setValues({
          ...values,
          currency: "$",
          amount: parseFloat(values.amount * 1.16).toFixed(2),
        });
      }
    } else if (e.target.value === "€") {
      if (values.currency === "BAM") {
        setValues({
          ...values,
          currency: "€",
          amount: parseFloat(values.amount * 0.51).toFixed(2),
        });
      } else if (values.currency === "$") {
        setValues({
          ...values,
          currency: "€",
          amount: parseFloat(values.amount * 0.86).toFixed(2),
        });
      } else if (values.currency === "€") {
        return;
      }
    }
  };

  useEffect(async () => {
    if (!sessionStorage.getItem("token")) {
      return window.location.assign("/");
    }

    let cache = await axios.get("http://localhost:5000/api/cache");
    let tempUser = cache.data;

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

    if (values.amount.split(".").length > 1) {
      let temp = values.amount.split(".")[1].split("").length;

      if (temp > 2) {
        return setValues({
          ...values,
          error: "Amount must have maximum of 2 decimal points!",
        });
      }
    }

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

      <h2
        className="new-title"
        style={{ textAlign: "center", color: "green", margin: "1rem" }}
      >
        New Income
      </h2>

      <div className="income-form">
        <div className="form-outline">
          <input
            type="text"
            id="form12"
            className="form-control"
            placeholder="title"
            onChange={handleChange("title")}
            style={{ borderColor: "green" }}
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
            value={values.amount}
            onChange={handleChange("amount")}
            style={{ width: "100%", borderColor: "green" }}
          />

          <select
            className="dashboard-input"
            id="mylist"
            onChange={currencyChange}
          >
            <optgroup>
              <option value="Choose" selected disabled>
                Choose a currency
              </option>
              <option value="BAM">BAM</option>
              <option value="$">$</option>
              <option value="€">€</option>
            </optgroup>
          </select>
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
