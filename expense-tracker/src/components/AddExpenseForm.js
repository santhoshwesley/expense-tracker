import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { FaHome, FaCar, FaShoppingCart, FaUtensils } from "react-icons/fa";
import { MdMovieFilter } from "react-icons/md";

const categoryIcons = {
  Home: <FaHome />,
  Transport: <FaCar />,
  Shopping: <FaShoppingCart />,
  Food: <FaUtensils />,
  Movie: <MdMovieFilter />,
};

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
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        {Object.keys(categoryIcons).map((category) => (
          <option key={category} value={category}>
            {category} {categoryIcons[category]}
          </option>
        ))}
      </select>
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
