import React from "react";
import paragon from "../../assets/paragon.png";

export default function Header() {
  return (
    <div className="login-header">
      <img src={paragon} alt="logo" />
      <h2 className="login-header-title">
        Personal Expense Tracker and Analyst
      </h2>
    </div>
  );
}
