import React, { useState, useEffect } from "react";
import Header from "../core/Header";
import Menu from "../core/Menu";
import { list } from "./api-transaction";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteTransaction from "./DeleteTransaction";

/* eslint-disable */

export default function TransactionsDaily() {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [currency, setCurrency] = useState("BAM");
  const [all, setAll] = useState(true);
  const [inc, setInc] = useState(false);
  const [exp, setExp] = useState(false);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      return window.location.assign("/");
    }

    let temp = JSON.parse(sessionStorage.getItem("token"));
    let tempUser = temp.user;

    setUser(tempUser);

    list().then((values, error) => {
      if (error) {
        setError(error);
      } else {
        let response = [];
        let i = 0;
        values.map((value, index) => {
          if (value.objectId._id == tempUser._id) {
            const date = value.created.split("-");
            const year = date[0];
            const month = date[1];
            const temp = date[2];
            const tempSplit = temp.split("T");
            const day = tempSplit[0];

            const currentDate = new Date();
            const currentDay = currentDate.getDate().toString();
            const currentMonth = (currentDate.getMonth() + 1).toString();
            const currentYear = currentDate.getFullYear().toString();
            const currentTime = currentDate.getHours();
            let currendD = "";

            if (currentDay.split("").length === 1) {
              currendD = "0" + currentDay;
            } else {
              currendD = currentDay;
            }

            if (
              year === currentYear &&
              month === currentMonth &&
              day === currendD
            ) {
              response[i] = value;

              let hourDiff =
                currentTime -
                value.created
                  .split("-")[2]
                  .split("T")[1]
                  .split(".")[0]
                  .split(":")[0];

              let msg = "";

              if (hourDiff <= 1) {
                msg = `less then ${hourDiff} hour ago`;
              } else {
                msg = `about ${hourDiff} hours ago`;
              }

              response[i].created = msg;
              i++;
            }
          }
        });
        setData(response);
      }
    });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    let tempIncomes = [];
    let tempExpenses = [];
    let i = 0;
    let j = 0;

    let tempInc = 0;
    let tempExp = 0;

    data.map((value, index) => {
      if (value.type === "income") {
        if (value.currency === "BAM") {
          tempIncomes[i] = value;
          i++;
          tempInc += value.amount;
        }

        if (value.currency === "$") {
          tempIncomes[i] = value;
          i++;
          tempInc += value.amount * 1.69;
        }

        if (value.currency === "€") {
          tempIncomes[i] = value;
          i++;
          tempInc += value.amount * 1.95;
        }
      } else if (value.type === "expense") {
        if (value.currency === "BAM") {
          tempExpenses[j] = value;
          j++;
          tempExp += value.amount;
        }

        if (value.currency === "$") {
          tempExpenses[j] = value;
          j++;
          tempExp += value.amount * 1.69;
        }

        if (value.currency === "€") {
          tempExpenses[j] = value;
          j++;
          tempExp += value.amount * 1.95;
        }
      }
    });

    let temp = tempInc - tempExp;

    setIncomes(tempIncomes);
    setExpenses(tempExpenses);
    setTotal(temp);
    setTotalIncome(tempInc);
    setTotalExpense(tempExp);
  }, [data]);

  return (
    <div>
      <Header name={user.firstName} id={user._id} />
      <Menu />

      <div className="transactions-daily">
        <div className="td-header">
          <h2 className="td-title">Daily</h2>
          <Button
            variant="outline-primary"
            onClick={() => window.location.assign("/transactions/add/income")}
          >
            ADD
          </Button>
        </div>

        <div className="td-main">
          <div className="td-main-menu">
            <Button
              variant="outline-primary"
              onClick={() => {
                setAll(true);
                setInc(false);
                setExp(false);
              }}
            >
              All
            </Button>
            <Button
              variant="outline-success"
              onClick={() => {
                setAll(false);
                setInc(true);
                setExp(false);
              }}
            >
              Incomes
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => {
                setAll(false);
                setInc(false);
                setExp(true);
              }}
            >
              Expenses
            </Button>
          </div>
          <div className="td-main-results">
            {all ? (
              <div>
                {data.map((value, index) => {
                  return (
                    <div key={index}>
                      <div className="all" key={index}>
                        <div className="all-div">
                          <p className="all-title">
                            {value.title}
                            {value.type === "income" ? (
                              <span className="all-income">
                                +{value.amount} {value.currency}
                              </span>
                            ) : (
                              <span className="all-expense">
                                -{value.amount} {value.currency}
                              </span>
                            )}
                          </p>

                          <Link to={`/transaction/edit/${value._id}`}>
                            <Button
                              variant="outline-primary"
                              key={index}
                              style={{
                                float: "right",
                                marginTop: "5px",
                              }}
                            >
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                            </Button>
                          </Link>

                          <Button
                            variant="outline-danger"
                            key={index + " "}
                            style={{
                              float: "right",
                              marginTop: "5px",
                              marginRight: "5%",
                            }}
                            onClick={() => {
                              setModal(true);
                              setId(value._id);
                            }}
                          >
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </Button>
                        </div>
                        <p className="all-date">{value.created}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div></div>
            )}
            {inc ? (
              <div>
                {incomes.map((value, index) => {
                  return (
                    <div className="all" key={index}>
                      <div className="all-div">
                        <p className="all-title">
                          {value.title}
                          <span className="all-income">
                            +{value.amount} {value.currency}
                          </span>
                        </p>
                        <Link to={`/transaction/edit/${value._id}`}>
                          <Button
                            variant="outline-primary"
                            key={index}
                            style={{
                              float: "right",
                              marginTop: "5px",
                            }}
                          >
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                          </Button>
                        </Link>

                        <Button
                          variant="outline-danger"
                          key={index + " "}
                          style={{
                            float: "right",
                            marginTop: "5px",
                            marginRight: "5%",
                          }}
                          onClick={() => {
                            setModal(true);
                            setId(value._id);
                          }}
                        >
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </Button>
                      </div>
                      <p className="all-date">{value.created}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div></div>
            )}
            {exp ? (
              <div>
                {expenses.map((value, index) => {
                  return (
                    <div className="all" key={index}>
                      <div className="all-div">
                        <p className="all-title">
                          {value.title}
                          <span className="all-expense">
                            -{value.amount} {value.currency}
                          </span>
                        </p>
                        <Link to={`/transaction/edit/${value._id}`}>
                          <Button
                            variant="outline-primary"
                            key={index}
                            style={{
                              float: "right",
                              marginTop: "5px",
                            }}
                          >
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                          </Button>
                        </Link>

                        <Button
                          variant="outline-danger"
                          key={index + " "}
                          style={{
                            float: "right",
                            marginTop: "5px",
                            marginRight: "5%",
                          }}
                          onClick={() => {
                            setModal(true);
                            setId(value._id);
                          }}
                        >
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </Button>
                      </div>
                      <p className="all-date">{value.created}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <DeleteTransaction modal={modal} id={id} setModal={setModal} />
    </div>
  );
}
