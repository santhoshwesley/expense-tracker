import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { SnackbarProvider, useSnackbar } from "notistack";
import WalletBalance from "./components/WalletBalance";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseTrends from "./components/ExpenseTrends";
import AddIncomeForm from "./components/AddIncomeForm";
import TotalExpenses from "./components/TotalExpenses";
import "./styles.css";

Modal.setAppElement("#root");

const App = () => {
  const [balance, setBalance] = useState(() => {
    return parseFloat(localStorage.getItem("balance")) || 5000;
  });
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addIncome = (amount) => {
    setBalance(balance + amount);
    enqueueSnackbar("Income added successfully", { variant: "success" });
    setIsIncomeModalOpen(false);
  };

  const addExpense = (expense) => {
    if (expense.amount > balance) {
      enqueueSnackbar("Insufficient balance", { variant: "error" });
      return;
    }
    setExpenses([...expenses, expense]);
    setBalance(balance - expense.amount);
    enqueueSnackbar("Expense added successfully", { variant: "success" });
    setIsExpenseModalOpen(false);
  };

  const editExpense = (index) => {
    setEditingExpense({ index, ...expenses[index] });
    setIsExpenseModalOpen(true);
  };

  const saveEditExpense = (expense) => {
    const updatedExpenses = [...expenses];
    const difference =
      expense.amount - updatedExpenses[editingExpense.index].amount;
    if (difference > balance) {
      enqueueSnackbar("Insufficient balance", { variant: "error" });
      return;
    }
    updatedExpenses[editingExpense.index] = expense;
    setExpenses(updatedExpenses);
    setBalance(balance - difference);
    setEditingExpense(null);
    setIsExpenseModalOpen(false);
    enqueueSnackbar("Expense updated successfully", { variant: "success" });
  };

  const deleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    const amount = updatedExpenses[index].amount;
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
    setBalance(balance + amount);
    enqueueSnackbar("Expense deleted successfully", { variant: "success" });
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <div className="app">
        <div className="top-section">
          <div className="info-section">
            <WalletBalance
              balance={balance}
              openIncomeModal={() => setIsIncomeModalOpen(true)}
            />
            <TotalExpenses
              expenses={expenses}
              setIsExpenseModalOpen={setIsExpenseModalOpen}
            />
            <ExpenseSummary expenses={expenses} />
          </div>
        </div>
        <div className="bottom-section">
          <div className="charts-container">
            <div className="chart-container">
              <ExpenseList
                expenses={expenses}
                editExpense={editExpense}
                deleteExpense={deleteExpense}
              />
            </div>
            <div className="chart-container">
              <ExpenseTrends expenses={expenses} />
            </div>
          </div>
        </div>
        <Modal
          isOpen={isIncomeModalOpen}
          onRequestClose={() => setIsIncomeModalOpen(false)}
          contentLabel="Add Income"
          className="modal"
          overlayClassName="overlay"
        >
          <AddIncomeForm addIncome={addIncome} />
        </Modal>
        <Modal
          isOpen={isExpenseModalOpen}
          onRequestClose={() => {
            setIsExpenseModalOpen(false);
            setEditingExpense(null);
          }}
          contentLabel="Add Expense"
          className="modal"
          overlayClassName="overlay"
        >
          <AddExpenseForm
            addExpense={editingExpense ? saveEditExpense : addExpense}
            expense={editingExpense}
          />
        </Modal>
      </div>
    </SnackbarProvider>
  );
};

export default App;
