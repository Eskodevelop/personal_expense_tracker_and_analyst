import React, { useState } from "react";
import { Modal, ModalTitle, ModalBody, Button } from "react-bootstrap";
import { remove } from "./api-transaction";

/* eslint-disable */

export default function DeleteTransaction({ modal, id, setModal }) {
  const [values, setValues] = useState({
    title: "",
    amount: 0,
    type: "",
    currency: "",
    open: false,
    error: "",
  });

  const clickHandler = (e) => {
    remove({ transactionId: id }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, open: true });
      }
    });
  };

  const { open } = values;

  if (open) {
    window.location.assign("/transactions/daily");
  }

  return (
    <div className="delete-transaction">
      <Modal show={modal}>
        <ModalTitle>
          <h2 className="delete-title">Delete Transaction</h2>
        </ModalTitle>

        <ModalBody>
          <div className="left">
            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
          </div>
          <div className="right">
            <p className="right-question">Are You Sure?!</p>
            <Button variant="outline-primary" onClick={clickHandler}>
              YES
            </Button>
            <Button variant="outline-danger" onClick={() => setModal(false)}>
              NO
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
