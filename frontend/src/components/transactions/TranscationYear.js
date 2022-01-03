import React, { useState, useEffect } from "react";
import Header from "../core/Header";
import Menu from "../core/Menu";
import { list } from "./api-transaction";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteTransaction from "./DeleteTransaction";
import axios from "axios";
import { Chart } from "react-google-charts";

/* eslint-disable */

export default function TransactionsYear() {
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
  const [ration, setRation] = useState(0);
  const [rationPercent, setRationPercent] = useState(0);
  const [rest, setRest] = useState(0);

  useEffect(async () => {
    if (!sessionStorage.getItem("token")) {
      return window.location.assign("/");
    }

    let cache = await axios.get("http://localhost:5000/api/cache");
    let tempUser = cache.data;

    setUser(tempUser);

    list().then((values, error) => {
      if (error) {
        setError(error);
      } else {
        let response = [];
        let i = 0;
        values.map((value, index) => {
          if (value.objectId._id == tempUser._id) {
            if (value.objectId._id == tempUser._id) {
              const date = value.created.split("-");
              const year = date[0];

              const currentDate = new Date();
              const currentYear = currentDate.getFullYear().toString();

              if (year === currentYear) {
                response[i] = value;
                i++;
              }
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
    let tempRatio = tempExp / tempInc;
    if (tempExp === 0 || tempInc === 0) tempRatio = 0;
    setRation(tempRatio);
  }, [data]);

  useEffect(() => {
    if (ration > 1 || ration === 1) {
      let tempP = ration * 100;
      setRationPercent(tempP);
      setRest(0);
    } else if (ration < 1) {
      let tempP = ration * 100;
      let tempR = 100 - tempP;
      setRationPercent(tempP);
      setRest(tempR);
    }
  }, [ration]);

  const changeHandler = (e) => {
    let tempData = data;

    data.map((value, index) => {
      if (e.target.value === "BAM") {
        if (tempData[index].currency === "BAM") {
          return;
        } else if (tempData[index].currency === "$") {
          let tempTotal = total * 1.69;
          let tempInc = totalIncome * 1.69;
          setTotalIncome(tempInc);
          let tempExp = totalExpense * 1.69;
          setTotalExpense(tempExp);
          setTotal(tempTotal);
          setCurrency("BAM");
          tempData[index].amount *= 1.69;
          tempData[index].currency = "BAM";
        } else if (tempData[index].currency === "€") {
          let tempTotal = total * 1.96;
          setTotal(tempTotal);
          let tempInc = totalIncome * 1.96;
          setTotalIncome(tempInc);
          let tempExp = totalExpense * 1.96;
          setTotalExpense(tempExp);
          setCurrency("BAM");
          tempData[index].amount *= 1.96;
          tempData[index].currency = "BAM";
        }
      } else if (e.target.value === "$") {
        if (tempData[index].currency === "BAM") {
          let tempTotal = parseFloat(total * 0.59).toFixed(2);
          setTotal(tempTotal);
          let tempInc = parseFloat(totalIncome * 0.59).toFixed(2);
          setTotalIncome(tempInc);
          let tempExp = parseFloat(totalExpense * 0.59).toFixed(2);
          setTotalExpense(tempExp);
          setCurrency("$");
          tempData[index].amount *= parseFloat(0.59).toFixed(2);
          tempData[index].currency = "$";
        } else if (tempData[index].currency === "$") {
          return;
        } else if (tempData[index].currency === "€") {
          let tempTotal = parseFloat(total * 1.16).toFixed(2);
          setTotal(tempTotal);
          let tempInc = parseFloat(totalIncome * 1.16).toFixed(2);
          setTotalIncome(tempInc);
          let tempExp = parseFloat(totalExpense * 1.16).toFixed(2);
          setTotalExpense(tempExp);
          setCurrency("$");
          tempData[index].amount *= parseFloat(1.16).toFixed(2);
          tempData[index].currency = "$";
        }
      } else if (e.target.value === "€") {
        if (tempData[index].currency === "BAM") {
          let tempTotal = parseFloat(total * 0.51).toFixed(2);
          setTotal(tempTotal);
          let tempInc = parseFloat(totalIncome * 0.51).toFixed(2);
          setTotalIncome(tempInc);
          let tempExp = parseFloat(totalExpense * 0.51).toFixed(2);
          setTotalExpense(tempExp);
          setCurrency("€");
          tempData[index].amount *= parseFloat(0.51).toFixed(2);
          tempData[index].currency = "€";
        } else if (tempData[index].currency === "$") {
          let tempTotal = parseFloat(total * 0.86).toFixed(2);
          setTotal(tempTotal);
          let tempInc = parseFloat(totalIncome * 0.86).toFixed(2);
          setTotalIncome(tempInc);
          let tempExp = parseFloat(totalExpense * 0.86).toFixed(2);
          setTotalExpense(tempExp);
          setCurrency("€");
          tempData[index].amount *= parseFloat(0.86).toFixed(2);
          tempData[index].currency = "€";
        } else if (tempData[index].currency === "€") {
          return;
        }
      }
    });

    for (let i = 0; i < tempData.length; i++) {
      tempData[i].amount = parseFloat(tempData[i].amount).toFixed(2);
    }

    setData(tempData);
  };

  return (
    <div>
      <Header name={user.firstName} id={user._id} />
      <Menu />

      <div className="transactions-daily">
        <div className="td-header">
          <h2 className="td-title">Yearly</h2>
          <Button
            variant="outline-primary"
            onClick={() => window.location.assign("/transactions/add/income")}
          >
            ADD
          </Button>
        </div>

        <div className="td-total">
          <h2 className="td-title">Total: {parseFloat(total).toFixed(2)}</h2>
          <h2 className="td-title">Ratio: {parseFloat(ration).toFixed(2)}</h2>
          <div className="form-outline" style={{ width: "100px" }}>
            <input
              type="search"
              list="mylist"
              className="form-control"
              placeholder="currency"
              style={{ width: "125px" }}
              onChange={changeHandler}
            />
          </div>

          <datalist id="mylist">
            <option value="BAM" />
            <option value="$" />
            <option value="€" />
          </datalist>
        </div>

        <div className="transactions-flex">
          <div className="transactions-chart-td">
            <Chart
              chartType="PieChart"
              width={"500px"}
              height={"500px"}
              data={[
                ["Ratio", ""],
                ["Ratio", rationPercent],
                ["", rest],
              ]}
              options={{ title: "Transactions" }}
            />
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
                              <i
                                className="fa fa-trash-o"
                                aria-hidden="true"
                              ></i>
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
                            <div className="all-name">{value.title}</div>
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
                    );
                  })}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
      <DeleteTransaction modal={modal} id={id} setModal={setModal} />
    </div>
  );
}
