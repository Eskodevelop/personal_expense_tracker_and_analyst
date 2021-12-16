import express from "express";
import transactionController from "../controllers/transaction.controller";

const router = express.Router();

router
  .route("/api/transactions")
  .get(transactionController.list)
  .post(transactionController.create);

router
  .route("/api/transactions/:transactionId")
  .get(transactionController.read)
  .put(transactionController.update)
  .delete(transactionController.remove);

router.param("transactionId", transactionController.transactionByID);

export default router;
