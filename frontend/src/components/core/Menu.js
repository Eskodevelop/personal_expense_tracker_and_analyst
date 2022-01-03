import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

/*eslint-disable*/

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

  useEffect(() => {
    return () => {
      setIsStat(false);
      setIsTransactions(false);
    };
  }, []);

  return (
    <div className="menu-dashboard">
      <Link to="/dashboard">
        <Button variant="outline-dark" style={btnStyle}>
          Dashboard
        </Button>
      </Link>

      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Transactions
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="/transactions/daily">
            Daily
          </a>
          <a class="dropdown-item" href="/transactions/weekly">
            Weekly
          </a>
          <a class="dropdown-item" href="/transactions/monthly">
            Montly
          </a>
          <a class="dropdown-item" href="/transactions/yearly">
            Yearly
          </a>
        </div>
      </div>

      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Statistics
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="/statistics/week">
            Week
          </a>
          <a class="dropdown-item" href="/statistics/month">
            Month
          </a>
          <a class="dropdown-item" href="/statistics/year">
            Year
          </a>
        </div>
      </div>
    </div>
  );
}
