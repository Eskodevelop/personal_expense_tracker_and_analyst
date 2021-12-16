import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/core/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import Dashboard from "./components/transactions/Dashboard";
import Edit from "./components/user/Edit";
import EditPassword from "./components/user/EditPassword";
import DeleteUser from "./components/user/DeleteUser";
import TransactionsDaily from "./components/transactions/TransactionsDaily";
import AddIncome from "./components/transactions/AddIncome";
import AddExpense from "./components/transactions/AddExpense";
import TransactionsWeek from "./components/transactions/TransactionsWeek";
import TransactionsMonth from "./components/transactions/TransactionsMonth";
import TransactionsYear from "./components/transactions/TranscationYear";
import EditTransaction from "./components/transactions/EditTransaction";
import StatisticsWeek from "./components/transactions/StatisticsWeek";
import StatisticsMonth from "./components/transactions/StatisticsMonth";
import StatisticsYear from "./components/transactions/StatisticsYear";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/user/edit/:userId" element={<Edit />} />
          <Route
            exact
            path="/user/edit/password/:userId"
            element={<EditPassword />}
          />
          <Route exact path="/user/delete/:userId" element={<DeleteUser />} />
          <Route
            exact
            path="/transactions/daily"
            element={<TransactionsDaily />}
          />
          <Route
            exact
            path="/transactions/weekly"
            element={<TransactionsWeek />}
          />
          <Route
            exact
            path="/transactions/monthly"
            element={<TransactionsMonth />}
          />
          <Route
            exact
            path="/transactions/yearly"
            element={<TransactionsYear />}
          />
          <Route
            exact
            path="/transactions/add/income"
            element={<AddIncome />}
          />
          <Route
            exact
            path="/transactions/add/expense"
            element={<AddExpense />}
          />

          <Route
            path="/transaction/edit/:transactionId"
            element={<EditTransaction />}
          />

          <Route path="/statistics/week" element={<StatisticsWeek />} />
          <Route path="/statistics/month" element={<StatisticsMonth />} />
          <Route path="/statistics/year" element={<StatisticsYear />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

//
export default App;
