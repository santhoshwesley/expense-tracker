import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaHome,
  FaCar,
  FaShoppingCart,
  FaUtensils,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { MdMovieFilter } from "react-icons/md";
import { format } from "date-fns";

const ITEMS_PER_PAGE = 5;

const categoryIcons = {
  Home: <FaHome />,
  Transport: <FaCar />,
  Shopping: <FaShoppingCart />,
  Food: <FaUtensils />,
  Movie: <MdMovieFilter />,
};

const ExpenseList = ({ expenses, editExpense, deleteExpense }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "EEEE MMMM d, yyyy");
  };

  const totalPages = Math.ceil(expenses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedExpenses = expenses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="expense-list">
      <h3>Expenses</h3>
      <ul>
        {selectedExpenses.map((expense, index) => (
          <li key={index}>
            <div className="expense-details">
              <span className="category-icon">
                {categoryIcons[expense.category]}
              </span>
              <span className="expense-info">
                <div className="expense-title">{expense.title}</div>
                <div className="expense-date" title={formatDate(expense.date)}>
                  {formatDate(expense.date)}
                </div>
              </span>
            </div>
            <div className="expense-actions">
              <span className="expense-amount">
                ${expense.amount.toFixed(2)}
              </span>
              <button onClick={() => editExpense(startIndex + index)}>
                <FaEdit />
              </button>
              <button onClick={() => deleteExpense(startIndex + index)}>
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <FaArrowLeft />
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ExpenseList;
