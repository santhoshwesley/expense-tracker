import React, { useState } from "react";

const AddIncomeForm = ({ addIncome }) => {
  const [amount, setAmount] = useState("");

  const handleAddIncome = (e) => {
    e.preventDefault();
    const income = parseFloat(amount);
    if (isNaN(income) || income <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    addIncome(income);
    setAmount("");
  };

  return (
    <form onSubmit={handleAddIncome}>
      <h2>Add Income</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddIncomeForm;
