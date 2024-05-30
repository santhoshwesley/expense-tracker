import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const ExpenseTrends = ({ expenses }) => {
  const data = expenses.reduce((acc, expense) => {
    const existing = acc.find((item) => item.name === expense.category);
    if (existing) {
      existing.amount += expense.amount;
    } else {
      acc.push({ name: expense.category, amount: expense.amount });
    }
    return acc;
  }, []);

  const renderLegend = () => null;

  return (
    <div className="expense-trends">
      <h3>Expense Trends</h3>
      <BarChart
        layout="vertical"
        width={500}
        height={250}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis type="number" hide={true} />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend content={renderLegend} />
        <Bar
          dataKey="amount"
          fill="#007bff"
          barSize={15}
          radius={[0, 10, 10, 0]}
        />
      </BarChart>
    </div>
  );
};

export default ExpenseTrends;
