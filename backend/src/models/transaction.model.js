import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Trasaction Title is Required!",
  },
  amount: {
    type: Number,
    min: 0,
    required: "Trasaction Amount is Required!",
  },
  currency: {
    type: String,
    required: "Trasaction Currency is Required!",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  type: {
    type: String,
  },
  objectId: {
    type: Object,
    required: "User data is Required!",
  },
  date: {
    type: String,
    default: new Date().getDay()
  },
});

export default mongoose.model("Trasaction", TransactionSchema);
