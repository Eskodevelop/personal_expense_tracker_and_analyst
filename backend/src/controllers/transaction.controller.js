import Transaction from "../models/transaction.model";
import _, { join } from "lodash";
import dbErrorHandler from "../helpers/dbErrorHandler";

const transactionByID = (req, res, next, id) => {
  Transaction.findById(id).exec((err, tran) => {
    if (err || !tran) {
      return res.status(400).json({ error: "Transaction not found" });
    }

    req.profile = tran;
    next();
  });
};

const create = (req, res, next) => {
  const tran = new Transaction(req.body);

  tran.save((err, result) => {
    if (err) {
      return res
        .status(400)
        .json({ error: dbErrorHandler.getErrorMessage(err) });
    }
    res.status(200).json({ message: "Successfully created transaction!" });
  });
};

const list = (req, res) => {
  Transaction.find((err, transactions) => {
    if (err) {
      return res.status(400).json({
        error: dbErrorHandler.getErrorMessage(err),
      });
    }
    res.json(transactions);
  }).select("title amount type currency created objectId date");
};

const read = (req, res) => {
  res.status(200).json(req.profile);
};

const remove = (req, res, next) => {
  let transaction = req.profile;

  transaction.remove((err, deletedTransaction) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }

    res.json(deletedTransaction);
  });
};

const update = (req, res, next) => {
  let transaction = req.profile;
  let data = req.body;

  transaction = _.extend(transaction, data);
  transaction.updated = Date.now();

  transaction.save((err) => {
    if (err) {
      return res.status(400).json({ error: dbErrorHandler.getErrorMessage() });
    }

    res.status(200).json(transaction);
  });
};

export default { transactionByID, create, list, read, update, remove };
