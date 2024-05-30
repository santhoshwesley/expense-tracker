import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ExpenseSummary = ({ expenses }) => {
  const data = expenses.reduce((acc, expense) => {
    const existing = acc.find((item) => item.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FF6B28", "#FF8042"];

  return (
    <div className="expense-summary">
      {/* <h3>Expense Summary</h3> */}
      <div style={{ width: "100%", height: 1200 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx={"50%"}
              cy={"50%"}
              outerRadius={70}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseSummary;
