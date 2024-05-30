import React from "react";

const TotalExpenses = ({ expenses, setIsExpenseModalOpen }) => {
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div className="total-expenses">
      <h3>Total Expenses: ${totalExpenses.toFixed(2)}</h3>
      <button onClick={() => setIsExpenseModalOpen(true)}>+Add Expense</button>
    </div>
  );
};

export default TotalExpenses;
