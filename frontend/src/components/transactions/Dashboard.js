import React, { useState, useEffect } from "react";
import Header from "../core/Header";
import Menu from "../core/Menu";
import { list } from "./api-transaction";
import { Button } from "react-bootstrap";
import { Chart } from "react-google-charts";
import axios from "axios";

/*eslint-disable*/ 

export default function Dashboard() {
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
        console.log(error);
      } else {
        let response = [];
        let i = 0;
        values.map((value, index) => {
          if (value.objectId._id == tempUser._id) {
            if (value.currency === "$") {
              value.amount = 1.73 * value.amount;
            } else if (value.currency === "€") {
              value.amount *= 1.96;
            }
            value.currency = "BAM";

            response[i] = value;
            i++;
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
          tempInc += parseFloat(value.amount * 1.69).toFixed(2);
        }

        if (value.currency === "€") {
          tempIncomes[i] = value;
          i++;
          tempInc += parseFloat(value.amount * 1.95).toFixed(2);
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
          tempExp += parseFloat(value.amount * 1.69).toFixed(2);
        }

        if (value.currency === "€") {
          tempExpenses[j] = value;
          j++;
          tempExp += parseFloat(value.amount * 1.95).toFixed(2);
        }
      }
    });

    let temp = parseFloat(tempInc - tempExp).toFixed(2);

    setIncomes(tempIncomes);
    setExpenses(tempExpenses);
    setTotal(parseFloat(temp).toFixed(2));
    setTotalIncome(parseFloat(tempInc).toFixed(2));
    setTotalExpense(parseFloat(tempExp).toFixed(2));
  }, [data]);

  const changeHandler = (e) => {
    let tempData = data;

    data.map((value, index) => {
      if (e.target.value === "BAM") {
        if (currency === "BAM") {
          return;
        } else if (currency === "$") {
          let tempTotal = total * 1.69;
          let tempInc = totalIncome * 1.69;
          setTotalIncome(tempInc);
          let tempExp = totalExpense * 1.69;
          setTotalExpense(tempExp);
          setTotal(tempTotal.toFixed(2));
          setCurrency("BAM");
          tempData[index].amount *= 1.69;
          tempData[index].currency = "BAM";
        } else if (currency === "€") {
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
        if (currency === "BAM") {
          let tempTotal = parseFloat(total * 0.59).toFixed(2);
          setTotal(tempTotal);
          let tempInc = parseFloat(totalIncome * 0.59).toFixed(2);
          setTotalIncome(tempInc);
          let tempExp = parseFloat(totalExpense * 0.59).toFixed(2);
          setTotalExpense(tempExp);
          setCurrency("$");
          tempData[index].amount *= parseFloat(0.59).toFixed(2);
          tempData[index].currency = "$";
        } else if (currency === "$") {
          return;
        } else if (currency === "€") {
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
        if (currency === "BAM") {
          let tempTotal = parseFloat(total * 0.51).toFixed(2);
          setTotal(tempTotal);
          let tempInc = parseFloat(totalIncome * 0.51).toFixed(2);
          setTotalIncome(tempInc);
          let tempExp = parseFloat(totalExpense * 0.51).toFixed(2);
          setTotalExpense(tempExp);
          setCurrency("€");
          tempData[index].amount *= parseFloat(0.51).toFixed(2);
          tempData[index].currency = "€";
        } else if (currency === "$") {
          let tempTotal = parseFloat(total * 0.86).toFixed(2);
          setTotal(tempTotal);
          let tempInc = parseFloat(totalIncome * 0.86).toFixed(2);
          setTotalIncome(tempInc);
          let tempExp = parseFloat(totalExpense * 0.86).toFixed(2);
          setTotalExpense(tempExp);
          setCurrency("€");
          tempData[index].amount *= parseFloat(0.86).toFixed(2);
          tempData[index].currency = "€";
        } else if (currency === "€") {
          return;
        }
      }
    });

    for (let i = 0; i < tempData.length; i++) {
      tempData[i].amount = parseFloat(tempData[i].amount).toFixed(2);
    }

    setData(tempData);
  };

  const showAll = (e) => {
    setAll(true);
    setInc(false);
    setExp(false);
  };

  const showIncomes = (e) => {
    setAll(false);
    setInc(true);
    setExp(false);
  };

  const showExpenses = (e) => {
    setAll(false);
    setInc(false);
    setExp(true);
  };

  return (
    <div className="dashboard">
      <Header name={user.firstName} id={user._id} />
      <Menu />
      <div className="dashboard-main">
        <div className="dashboard-main-left">
          <h2 className="dashboard-main-left-h2">Total Balance: {total}</h2>
          <div>
            <input
              className="dashboard-input"
              type="search"
              list="mylist"
              onChange={changeHandler}
              defaultValue="BAM"
            />
            <datalist id="mylist">
              <option value="BAM" />
              <option value="$" />
              <option value="€" />
            </datalist>
          </div>
          <div>
            <Chart
              chartType="PieChart"
              width={"500px"}
              height={"500px"}
              data={[
                ["Income", "Expense"],
                ["Income", parseInt(totalIncome)],
                ["Expense", parseInt(totalExpense)],
              ]}
              options={{ title: "Transactions" }}
            />
            <p className="dashboard-income">
              Incomes: <span style={{ color: "green" }}>+{totalIncome}</span>{" "}
              {currency}{" "}
              <span style={{ color: "green", background: "green" }}>◻</span>
            </p>
            <p className="dashboard-expense">
              Expenses: <span style={{ color: "red" }}>-{totalExpense}</span>{" "}
              {currency}{" "}
              <span style={{ color: "red", background: "red" }}>◻</span>
            </p>
          </div>
        </div>
        <div className="dashboard-main-right">
          <div className="dashboard-main-right-buttons">
            <Button variant="outline-primary" onClick={showAll}>
              All
            </Button>
            <Button variant="outline-primary" onClick={showIncomes}>
              Income
            </Button>
            <Button variant="outline-primary" onClick={showExpenses}>
              Expense
            </Button>
          </div>
          {all ? (
            <div>
              {data &&
                data.map((value, index) => {
                  return (
                    <div className="all" key={index}>
                      <div className="all-div">
                        <p className="all-title">
                          {value.title}
                          {value.type === "income" ? (
                            <span className="all-income">
                              +{value.amount.toFixed(2)} {value.currency}
                            </span>
                          ) : (
                            <span className="all-expense">
                              -{value.amount.toFixed(2)} {value.currency}
                            </span>
                          )}
                        </p>
                      </div>
                      <p className="all-date">{value.created}</p>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div></div>
          )}
          {inc ? (
            <div>
              {incomes &&
                incomes.map((value, index) => {
                  return (
                    <div className="all" key={index}>
                      <div className="all-div">
                        <p className="all-title">
                          {value.title}
                          <span className="all-income">
                            +{value.amount.toFixed(2)} {value.currency}
                          </span>
                        </p>
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
              {expenses &&
                expenses.map((value, index) => {
                  return (
                    <div className="all" key={index}>
                      <div className="all-div">
                        <p className="all-title">
                          {value.title}
                          <span className="all-expense">
                            -{value.amount.toFixed(2)} {value.currency}
                          </span>
                        </p>
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
  );
}
