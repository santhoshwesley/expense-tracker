import React from "react";

const WalletBalance = ({ balance, openIncomeModal }) => {
  return (
    <div className="wallet-balance">
      <h2>Wallet Balance: ${balance.toFixed(2)}</h2>
      <button onClick={openIncomeModal}>+Add Income</button>
    </div>
  );
};

export default WalletBalance;
