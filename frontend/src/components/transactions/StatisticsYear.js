import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import Header from "../core/Header";
import Menu from "../core/Menu";
import { list } from "./api-transaction";
import { Chart } from "react-google-charts";
import { Button } from "react-bootstrap";

// StatisticsYear

export default function StatisticsYear() {
  const [user, setUser] = useState({
    _id: "",
    firstName: "",
  });
  const [data, setData] = useState([]);
  const [jan, setJan] = useState({ income: 0, expense: 0 });
  const [feb, setFeb] = useState({ income: 0, expense: 0 });
  const [mar, setMar] = useState({ income: 0, expense: 0 });
  const [apr, setApr] = useState({ income: 0, expense: 0 });
  const [may, setMay] = useState({ income: 0, expense: 0 });
  const [jun, setJun] = useState({ income: 0, expense: 0 });
  const [jul, setJul] = useState({ income: 0, expense: 0 });
  const [aug, setAug] = useState({ income: 0, expense: 0 });
  const [sep, setSep] = useState({ income: 0, expense: 0 });
  const [oct, setOct] = useState({ income: 0, expense: 0 });
  const [nov, setNov] = useState({ income: 0, expense: 0 });
  const [dec, setDec] = useState({ income: 0, expense: 0 });
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

    let tempJanInc = 0;
    let tempJanExp = 0;
    let tempFebInc = 0;
    let tempFebExp = 0;
    let tempMarInc = 0;
    let tempMarExp = 0;
    let tempAprInc = 0;
    let tempAprExp = 0;
    let tempMayInc = 0;
    let tempMayExp = 0;
    let tempJunInc = 0;
    let tempJunExp = 0;
    let tempJulInc = 0;
    let tempJulExp = 0;
    let tempAugInc = 0;
    let tempAugExp = 0;
    let tempSepInc = 0;
    let tempSepExp = 0;
    let tempOctInc = 0;
    let tempOctExp = 0;
    let tempNovInc = 0;
    let tempNovExp = 0;
    let tempDecInc = 0;
    let tempDecExp = 0;

    data.map((value, index) => {
      const temp = value.created.split("-");
      const month = temp[1];

      if (month === "1") {
        if (value.type === "income") {
          tempJanInc += value.amount;
        } else {
          tempJanExp += value.amount;
        }
      } else if (month === "2") {
        if (value.type === "income") {
          tempFebInc += value.amount;
        } else {
          tempFebExp += value.amount;
        }
      } else if (month === "3") {
        if (value.type === "income") {
          tempMarInc += value.amount;
        } else {
          tempMarExp += value.amount;
        }
      } else if (month === "4") {
        if (value.type === "income") {
          tempAprInc += value.amount;
        } else {
          tempAprExp += value.amount;
        }
      } else if (month === "5") {
        if (value.type === "income") {
          tempMayInc += value.amount;
        } else {
          tempMayExp += value.amount;
        }
      } else if (month === "6") {
        if (value.type === "income") {
          tempJunInc += value.amount;
        } else {
          tempJunExp += value.amount;
        }
      } else if (month === "7") {
        if (value.type === "income") {
          tempJulInc += value.amount;
        } else {
          tempJulExp += value.amount;
        }
      } else if (month === "8") {
        if (value.type === "income") {
          tempAugInc += value.amount;
        } else {
          tempAugExp += value.amount;
        }
      } else if (month === "9") {
        if (value.type === "income") {
          tempSepInc += value.amount;
        } else {
          tempSepExp += value.amount;
        }
      } else if (month === "10") {
        if (value.type === "income") {
          tempOctInc += value.amount;
        } else {
          tempOctExp += value.amount;
        }
      } else if (month === "11") {
        if (value.type === "income") {
          tempNovInc += value.amount;
        } else {
          tempNovExp += value.amount;
        }
      } else if (month === "12") {
        if (value.type === "income") {
          tempDecInc += value.amount;
        } else {
          tempDecExp += value.amount;
        }
      }
    });

    setJan({ income: tempJanInc, expense: tempJanExp });
    setFeb({ income: tempFebInc, expense: tempFebExp });
    setMar({ income: tempMarInc, expense: tempMarExp });
    setApr({ income: tempAprInc, expense: tempAprExp });
    setMay({ income: tempMayInc, expense: tempMayExp });
    setJun({ income: tempJunInc, expense: tempJunExp });
    setJul({ income: tempJulInc, expense: tempJulExp });
    setAug({ income: tempAugInc, expense: tempAugExp });
    setSep({ income: tempSepExp, expense: tempSepExp });
    setOct({ income: tempOctInc, expense: tempOctExp });
    setNov({ income: tempNovInc, expense: tempNovExp });
    setDec({ income: tempDecInc, expense: tempDecExp });
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
                  ["Jan Inc", jan.income],
                  ["Jan Exp", jan.expense],
                  ["Feb Inc", feb.income],
                  ["Feb Exp", feb.expense],
                  ["Mar Inc", mar.income],
                  ["Mar Exp", mar.expense],
                  ["Apr Inc", apr.income],
                  ["Apr Exp", apr.expense],
                  ["May Inc", may.income],
                  ["May Exp", may.expense],
                  ["Jun Inc", jun.income],
                  ["Jun Exp", jun.expense],
                  ["Jul Inc", jul.income],
                  ["Jul Exp", jul.expense],
                  ["Aug Inc", aug.income],
                  ["Aug Exp", aug.expense],
                  ["Sep Inc", sep.income],
                  ["Sep Exp", sep.expense],
                  ["Oct Inc", oct.income],
                  ["Oct Exp", oct.expense],
                  ["Nov Inc", nov.income],
                  ["Nov Exp", nov.expense],
                  ["Dec Inc", dec.income],
                  ["Dec Exp", dec.expense],
                ]}
                options={{ title: "Transactions For Last Year per Months" }}
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
                  ["Jan", jan.income, jan.expense],
                  ["Feb", feb.income, feb.expense],
                  ["Mar", mar.income, mar.expense],
                  ["Apr", apr.income, apr.expense],
                  ["May", may.income, may.expense],
                  ["Jun", jun.income, jun.expense],
                  ["Jul", jul.income, jul.expense],
                  ["Aug", aug.income, aug.expense],
                  ["Sep", sep.income, sep.expense],
                  ["Oct", oct.income, oct.expense],
                  ["Nov", nov.income, nov.expense],
                  ["Dec", dec.income, dec.expense],
                ]}
                options={{ title: "Transactions For Last Year per Months" }}
              />
            )}

            {chart === "column" && (
              <Chart
                chartType="ColumnChart"
                width={"500px"}
                height={"500px"}
                data={[
                  ["Transactions", "Income", "Expense"],
                  ["Jan", jan.income, jan.expense],
                  ["Feb", feb.income, feb.expense],
                  ["Mar", mar.income, mar.expense],
                  ["Apr", apr.income, apr.expense],
                  ["May", may.income, may.expense],
                  ["Jun", jun.income, jun.expense],
                  ["Jul", jul.income, jul.expense],
                  ["Aug", aug.income, aug.expense],
                  ["Sep", sep.income, sep.expense],
                  ["Oct", oct.income, oct.expense],
                  ["Nov", nov.income, nov.expense],
                  ["Dec", dec.income, dec.expense],
                ]}
                options={{ title: "Transactions For Last Year per Months" }}
              />
            )}
          </div>

          <div className="stat-right">
            {jan.income === 0 && jan.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Jan <span className="all-income">+{jan.income} </span>
                <span className="all-expense">-{jan.expense}</span>
              </p>
            )}
            {feb.income === 0 && feb.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Feb <span className="all-income">+{feb.income} </span>
                <span className="all-expense">-{feb.expense}</span>
              </p>
            )}
            {mar.income === 0 && mar.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Mar <span className="all-income">+{mar.income} </span>
                <span className="all-expense">-{mar.expense}</span>
              </p>
            )}
            {apr.income === 0 && apr.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Apr <span className="all-income">+{apr.income} </span>
                <span className="all-expense">-{apr.expense}</span>
              </p>
            )}
            {may.income === 0 && may.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                May <span className="all-income">+{may.income} </span>
                <span className="all-expense">-{may.expense}</span>
              </p>
            )}
            {jun.income === 0 && jun.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Jun <span className="all-income">+{jun.income} </span>
                <span className="all-expense">-{jun.expense}</span>
              </p>
            )}
            {jul.income === 0 && jul.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Jul <span className="all-income">+{jul.income} </span>
                <span className="all-expense">-{jul.expense}</span>
              </p>
            )}
            {aug.income === 0 && aug.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Aug <span className="all-income">+{aug.income} </span>
                <span className="all-expense">-{aug.expense}</span>
              </p>
            )}
            {sep.income === 0 && sep.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Sep <span className="all-income">+{sep.income} </span>
                <span className="all-expense">-{sep.expense}</span>
              </p>
            )}
            {oct.income === 0 && oct.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Oct <span className="all-income">+{oct.income} </span>
                <span className="all-expense">-{oct.expense}</span>
              </p>
            )}
            {nov.income === 0 && nov.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Nov <span className="all-income">+{nov.income} </span>
                <span className="all-expense">-{nov.expense}</span>
              </p>
            )}
            {dec.income === 0 && dec.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                Dec <span className="all-income">+{dec.income} </span>
                <span className="all-expense">-{dec.expense}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
