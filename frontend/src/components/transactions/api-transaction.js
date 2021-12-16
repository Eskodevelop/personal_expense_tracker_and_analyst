import baseUrl from "../../config";

const create = (transaction) => {
  return fetch(`${baseUrl}/api/transactions`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const list = () => {
  return fetch(`${baseUrl}/api/transactions`, { method: "GET" })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const read = (params) => {
  return fetch(`${baseUrl}/api/transactions/${params.transactionId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const update = (params, transaction) => {
  return fetch(`${baseUrl}/api/transactions/${params.transactionId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const remove = (params) => {
  return fetch(`${baseUrl}/api/transactions/${params.transactionId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export { create, list, read, update, remove };
