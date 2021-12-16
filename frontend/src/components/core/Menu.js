import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const btnStyle = {
  borderRadius: "0px",
  width: "150px",
};

const btnStyle2 = {
  borderRadius: "0px",
  width: "150px",
};

export default function Menu() {
  const [isTransactions, setIsTransactions] = useState(false);
  const [isStat, setIsStat] = useState(false);

  return (
    <div className="menu-dashboard">
      <Link to="/dashboard">
        <Button variant="outline-dark" style={btnStyle}>
          Dashboard
        </Button>
      </Link>
      <Button
        variant="outline-dark"
        onClick={() => setIsTransactions(!isTransactions)}
        style={btnStyle}
      >
        Transactions
      </Button>
      <Button
        variant="outline-dark"
        onClick={() => setIsStat(!isStat)}
        style={btnStyle}
      >
        Statistics
      </Button>

      {isTransactions ? (
        <div className="menu-tran">
          <Link to="/transactions/daily">
            <Button variant="dark" style={btnStyle2}>
              Daily
            </Button>
          </Link>
          <Link to="/transactions/weekly">
            <Button variant="dark" style={btnStyle2}>
              Weekly
            </Button>
          </Link>
          <Link to="/transactions/monthly">
            <Button variant="dark" style={btnStyle2}>
              Montly
            </Button>
          </Link>
          <Link to="/transactions/yearly">
            <Button variant="dark" style={btnStyle2}>
              Yearly
            </Button>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
      {isStat ? (
        <div className="menu-stat">
          <Link to="/statistics/week">
            <Button variant="dark" style={btnStyle2}>
              Week
            </Button>
          </Link>{" "}
          <Link to="/statistics/month">
            <Button variant="dark" style={btnStyle2}>
              Month
            </Button>
          </Link>{" "}
          <Link to="/statistics/year">
            <Button variant="dark" style={btnStyle2}>
              Year
            </Button>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
