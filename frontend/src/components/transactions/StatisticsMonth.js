import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import Header from "../core/Header";
import Menu from "../core/Menu";
import { list } from "./api-transaction";
import { Chart } from "react-google-charts";
import { Button } from "react-bootstrap";

// StatisticsYear

export default function StatisticsMonth() {
  const [user, setUser] = useState({
    _id: "",
    firstName: "",
  });
  const [data, setData] = useState([]);
  const [month, setMonth] = useState("");
  const [firstW, setFirstW] = useState({ income: 0, expense: 0 });
  const [secondW, setSecondW] = useState({ income: 0, expense: 0 });
  const [thirdW, setThirdW] = useState({ income: 0, expense: 0 });
  const [fourW, setFourW] = useState({ income: 0, expense: 0 });
  const [fiveW, setFiveW] = useState({ income: 0, expense: 0 });
  const [chart, setChart] = useState("pie");

  /* eslint-disable */

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      return <Navigate to="/" />;
    }

    const token = JSON.parse(sessionStorage.getItem("token"));
    const tempUser = token.user;
    setUser(tempUser);

    list().then((values, error) => {
      if (error) {
        console.log(error);
      } else {
        let response = [];
        let i = 0;
        values.map((value, index) => {
          if (value.objectId._id == tempUser._id) {
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

              const weekChecker = currentDay - day;

              if (month === currentMonth && year === currentYear) {
                if (month === "1") {
                  setMonth("January");
                } else if (month === "2") {
                  setMonth("February");
                } else if (month === "3") {
                  setMonth("March");
                } else if (month === "4") {
                  setMonth("April");
                } else if (month === "5") {
                  setMonth("May");
                } else if (month === "6") {
                  setMonth("June");
                } else if (month === "7") {
                  setMonth("July");
                } else if (month === "8") {
                  setMonth("August");
                } else if (month === "9") {
                  setMonth("September");
                } else if (month === "10") {
                  setMonth("October");
                } else if (month === "11") {
                  setMonth("November");
                } else if (month === "12") {
                  setMonth("December");
                }
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

    let tempFWI = 0;
    let tempFWE = 0;
    let tempSWI = 0;
    let tempSWE = 0;
    let tempTI = 0;
    let tempTE = 0;
    let tempFI = 0;
    let tempFE = 0;
    let tempFiveInc = 0;
    let tempFiveExp = 0;

    data.map((value, index) => {
      const date = value.created.split("-");
      const temp = date[2];
      const tempSplit = temp.split("T");
      const day = tempSplit[0];

      const currentDate = new Date();
      const currentDay = currentDate.getDate().toString();

      const weekChecker = parseInt(currentDay - day);

      if (weekChecker < 8) {
        if (value.type === "income") {
          tempFWI += value.amount;
        } else {
          tempFWE += value.amount;
        }
      } else if (weekChecker < 15) {
        if (value.type === "income") {
          tempSWI += value.amount;
        } else {
          tempSWE += value.amount;
        }
      } else if (weekChecker < 22) {
        if (value.type === "income") {
          tempTI += value.amount;
        } else {
          tempTE += value.amount;
        }
      } else if (weekChecker < 29) {
        if (value.type === "income") {
          tempFI += value.amount;
        } else {
          tempFI += value.amount;
        }
      } else {
        if (value.type === "income") {
          tempFiveInc += value.amount;
        } else {
          tempFiveExp += value.amount;
        }
      }
    });

    setFirstW({ income: tempFWI, expense: tempFWE });
    setSecondW({ income: tempSWI, expense: tempSWE });
    setThirdW({ income: tempTI, expense: tempTE });
    setFourW({ income: tempFI, expense: tempFE });
    setFiveW({ income: tempFiveInc, expense: tempFiveExp });
  }, [data]);

  return (
    <div>
      <Header id={user._id} firstName={user.firstName} />
      <Menu />
      <div className="stat-week">
        <div className="stat-menu">
          <Button variant="outline-primary" onClick={() => setChart("pie")}>
            Pie
          </Button>
          <Button variant="outline-primary" onClick={() => setChart("column")}>
            Column
          </Button>
          <Button variant="outline-primary" onClick={() => setChart("bar")}>
            Bar
          </Button>
        </div>

        <div className="stat-main">
          <div className="stat-left">
            {chart === "pie" && (
              <Chart
                chartType="PieChart"
                data={[
                  ["Transactions", "Per Month"],
                  ["First Week Inc", firstW.income],
                  ["First Week Exp", firstW.expense],
                  ["Second Week Inc", secondW.income],
                  ["Second Week Exp", secondW.expense],
                  ["Third Week Inc", thirdW.income],
                  ["Third Week Exp", thirdW.expense],
                  ["Fourth Week Inc", fourW.income],
                  ["Fourth Week Exp", fourW.expense],
                  ["Fiveth Week Inc", fiveW.income],
                  ["Fiveth Week Exp", fiveW.expense],
                ]}
                options={{
                  title: "Transactions For Last Month Grouped by Weeks",
                }}
                width={"500px"}
                height={"500px"}
              />
            )}

            {chart === "bar" && (
              <Chart
                chartType="BarChart"
                width={"500px"}
                height={"500px"}
                data={[
                  ["Transactions", "Income", "Expense"],
                  ["First Week", firstW.income, firstW.expense],
                  ["Second Week", secondW.income, secondW.expense],
                  ["Third Week", thirdW.income, thirdW.expense],
                  ["Fourth Week", fourW.income, fourW.expense],
                  ["Fiveth Week", fiveW.income, fiveW.expense],
                ]}
                options={{
                  title: "Transactions For Last Month Grouped by Weeks",
                }}
              />
            )}

            {chart === "column" && (
              <Chart
                chartType="ColumnChart"
                width={"500px"}
                height={"500px"}
                data={[
                  ["Transactions", "Income", "Expense"],
                  ["First Week", firstW.income, firstW.expense],
                  ["Second Week", secondW.income, secondW.expense],
                  ["Third Week", thirdW.income, thirdW.expense],
                  ["Fourth Week", fourW.income, fourW.expense],
                  ["Fiveth Week", fiveW.income, fiveW.expense],
                ]}
                options={{
                  title: "Transactions For Last Month Grouped by Weeks",
                }}
              />
            )}
          </div>

          <div className="stat-right">
            {firstW.income === 0 && firstW.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                First Week {month}{" "}
                <span className="all-income">+{firstW.income} </span>
                <span className="all-expense">-{firstW.expense}</span>
              </p>
            )}
            {secondW.income === 0 && secondW.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Second Week {month}{" "}
                <span className="all-income">+{secondW.income} </span>
                <span className="all-expense">-{secondW.expense}</span>
              </p>
            )}
            {thirdW.income === 0 && thirdW.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Third Week {month}{" "}
                <span className="all-income">+{thirdW.income} </span>
                <span className="all-expense">-{thirdW.expense}</span>
              </p>
            )}
            {fourW.income === 0 && fourW.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Fourth Week {month}{" "}
                <span className="all-income">+{fourW.income} </span>
                <span className="all-expense">-{fourW.expense}</span>
              </p>
            )}
            {fiveW.income === 0 && fiveW.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Fiveth Week {month}{" "}
                <span className="all-income">+{fiveW.income} </span>
                <span className="all-expense">-{fiveW.expense}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
