import React, { useState } from "react";
import { useSnackbar } from "notistack";

const AddExpenseForm = ({ addExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) {
      enqueueSnackbar("All fields are required", { variant: "error" });
      return;
    }
    addExpense({ title, amount: parseFloat(amount), category, date });
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-expense-form">
      <h2>Add Expense</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;
