import React from "react";
import { Button } from "react-bootstrap";

export default function AddMenu() {
  return (
    <div className="add-menu">
      <Button
        variant="outline-success"
        onClick={() => window.location.assign("/transactions/add/income")}
      >
        New Income
      </Button>
      <Button
        variant="outline-danger"
        onClick={() => window.location.assign("/transactions/add/expense")}
      >
        New Expense
      </Button>
    </div>
  );
}
