import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import Header from "../core/Header";
import Menu from "../core/Menu";
import { list } from "./api-transaction";
import { Chart } from "react-google-charts";
import { Button } from "react-bootstrap";

/* eslint-disable */

export default function StatisticsWeek() {
  const [user, setUser] = useState({
    _id: "",
    firstName: "",
  });
  const [data, setData] = useState([]);
  const [mon, setMon] = useState({ income: 0, expense: 0 });
  const [tue, setTue] = useState({ income: 0, expense: 0 });
  const [wen, setWen] = useState({ income: 0, expense: 0 });
  const [thu, setThu] = useState({ income: 0, expense: 0 });
  const [fri, setFri] = useState({ income: 0, expense: 0 });
  const [sat, setSat] = useState({ income: 0, expense: 0 });
  const [sun, setSun] = useState({ income: 0, expense: 0 });
  const [chart, setChart] = useState("pie");

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

              if (
                month===currentMonth &&
                year === currentYear
              ) {
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

    let tempMonInc = 0;
    let tempMonExp = 0;
    let tempTueInc = 0;
    let tempTueExp = 0;
    let tempWenInc = 0;
    let tempWenExp = 0;
    let tempThuInc = 0;
    let tempThuExp = 0;
    let tempFriInc = 0;
    let tempFriExp = 0;
    let tempSatInc = 0;
    let tempSatExp = 0;
    let tempSunInc = 0;
    let tempSunExp = 0;

    data.map((value, index) => {
      if (value.date === "1") {
        if (value.type === "income") {
          tempMonInc += value.amount;
        } else {
          tempMonExp += value.amount;
        }
      } else if (value.date === "2") {
        if (value.type === "income") {
          tempTueInc += value.amount;
        } else {
          tempTueExp += value.amount;
        }
      } else if (value.date === "3") {
        if (value.type === "income") {
          tempWenInc += value.amount;
        } else {
          tempWenExp += value.amount;
        }
      } else if (value.date === "4") {
        if (value.type === "income") {
          tempThuInc += value.amount;
        } else {
          tempThuExp += value.amount;
        }
      } else if (value.date === "5") {
        if (value.type === "income") {
          tempFriInc += value.amount;
        } else {
          tempFriExp += value.amount;
        }
      } else if (value.date === "6") {
        if (value.type === "income") {
          tempSatInc += value.amount;
        } else {
          tempSatExp += value.amount;
        }
      } else if (value.date === "7") {
        if (value.type === "income") {
          tempSunInc += value.amount;
        } else {
          tempSunExp += value.amount;
        }
      }
    });

    setMon({ income: tempMonInc, expense: tempMonExp });
    setTue({ income: tempTueInc, expense: tempTueExp });
    setWen({ income: tempWenInc, expense: tempWenExp });
    setThu({ income: tempThuInc, expense: tempThuExp });
    setFri({ income: tempFriInc, expense: tempFriExp });
    setSat({ income: tempSatInc, expense: tempSatExp });
    setSun({ income: tempSunInc, expense: tempSunExp });
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
                  ["Transactions", "Days per Week"],
                  ["Mon Inc", mon.income],
                  ["Mon Exp", mon.expense],
                  ["Tue Inc", tue.income],
                  ["Tue Exp", tue.expense],
                  ["Wen Inc", wen.income],
                  ["Wen Exp", wen.expense],
                  ["Thu Inc", thu.income],
                  ["Thu Exp", thu.expense],
                  ["Fri Inc", fri.income],
                  ["Fri Exp", fri.expense],
                  ["Sat Inc", sat.income],
                  ["Sat Exp", sat.expense],
                  ["Sun Inc", sun.income],
                  ["Sun Exp", sun.expense],
                ]}
                options={{ title: "Transactions For Last Week" }}
                width={"500px"}
                height={"500px"}
                style={{ background: "transparent" }}
              />
            )}

            {chart === "bar" && (
              <Chart
                chartType="BarChart"
                width={"500px"}
                height={"500px"}
                data={[
                  ["Transactions", "Income", "Expense"],
                  ["Mon", mon.income, mon.expense],
                  ["Tue", tue.income, tue.expense],
                  ["Wen", wen.income, wen.expense],
                  ["Thu", thu.income, thu.expense],
                  ["Fri", fri.income, fri.expense],
                  ["Sat", sat.income, sat.expense],
                  ["Sun", sun.income, sun.expense],
                ]}
                options={{ title: "Transactions For Last Week" }}
              />
            )}

            {chart === "column" && (
              <Chart
                chartType="ColumnChart"
                width={"500px"}
                height={"500px"}
                data={[
                  ["Transactions", "Income", "Expense"],
                  ["Mon", mon.income, mon.expense],
                  ["Tue", tue.income, tue.expense],
                  ["Wen", wen.income, wen.expense],
                  ["Thu", thu.income, thu.expense],
                  ["Fri", fri.income, fri.expense],
                  ["Sat", sat.income, sat.expense],
                  ["Sun", sun.income, sun.expense],
                ]}
                options={{ title: "Transactions For Last Week" }}
              />
            )}
          </div>

          <div className="stat-right">
            {mon.income === 0 && mon.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Mon <span className="all-income">+{mon.income} </span>
                <span className="all-expense">-{mon.expense}</span>
              </p>
            )}
            {tue.income === 0 && tue.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Tue <span className="all-income">+{tue.income} </span>
                <span className="all-expense">-{tue.expense}</span>
              </p>
            )}
            {wen.income === 0 && wen.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Wen <span className="all-income">+{wen.income} </span>
                <span className="all-expense">-{wen.expense}</span>
              </p>
            )}
            {thu.income === 0 && thu.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Thu <span className="all-income">+{thu.income} </span>
                <span className="all-expense">-{thu.expense}</span>
              </p>
            )}
            {fri.income === 0 && fri.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Fri <span className="all-income">+{fri.income} </span>
                <span className="all-expense">-{fri.expense}</span>
              </p>
            )}
            {sat.income === 0 && sat.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Sat <span className="all-income">+{sat.income} </span>
                <span className="all-expense">-{sat.expense}</span>
              </p>
            )}
            {sun.income === 0 && sun.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Sun <span className="all-income">+{sun.income} </span>
                <span className="all-expense">-{sun.expense}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
