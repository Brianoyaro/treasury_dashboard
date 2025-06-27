import React, { useState } from "react";
import Logs from "./logs";
import TransferMoney from "./transferMoney";
import AccountCard from "./accountCard";

//  Flash message component
function FlashMessage({ type, message, onClose }) {
  if (!message) return null;
  const baseStyle = "p-3 rounded mb-4 text-sm font-medium";
  const typeStyles = {
    success: "bg-green-100 text-green-800 border border-green-300",
    error: "bg-red-100 text-red-800 border border-red-300",
  };

  return (
    <div className={`${baseStyle} ${typeStyles[type]} relative`}>
      {message}
      <button
        className="absolute top-1 right-2 text-xs text-gray-500 hover:text-black"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}

const default_accounts = [
  { id: 1, name: "Mpesa_KES_1", currencyType: "KES", amount: 50000 },
  { id: 2, name: "Bank_USD_1", currencyType: "USD", amount: 1000 },
  { id: 3, name: "GTB_NGN_1", currencyType: "NGN", amount: 800000 },
  { id: 4, name: "Mpesa_KES_2", currencyType: "KES", amount: 65000 },
  { id: 5, name: "Bank_USD_2", currencyType: "USD", amount: 3000 },
  { id: 6, name: "GTB_NGN_2", currencyType: "NGN", amount: 450000 },
  { id: 7, name: "Mpesa_KES_3", currencyType: "KES", amount: 22000 },
  { id: 8, name: "Bank_USD_3", currencyType: "USD", amount: 500 },
  { id: 9, name: "GTB_NGN_3", currencyType: "NGN", amount: 150000 },
  { id: 10, name: "Mpesa_KES_4", currencyType: "KES", amount: 32000 },
];

const default_logs = [];

const FX = {
  KES_USD: 1 / 140,
  USD_KES: 140,
  USD_NGN: 1500,
  NGN_USD: 1 / 1500,
  KES_NGN: 10.5,
  NGN_KES: 1 / 10.5,
};

export default function Dashboard() {
  const [accounts, setAccounts] = useState(default_accounts);
  const [logs, setLogs] = useState(default_logs);
  const [flashMessage, setFlashMessage] = useState({ type: "", message: "" });

  const showFlash = (type, message) => {
    setFlashMessage({ type, message });
    setTimeout(() => {
      setFlashMessage({ type: "", message: "" });
    }, 4000);
  };

  const onTransfer = (fromAccount, toAccount, amount, note, dateObj) => {
    const from = accounts.find((acc) => acc.id === fromAccount);
    const to = accounts.find((acc) => acc.id === toAccount);

    if (from.id === to.id) {
      return showFlash("error", "Cannot transfer to the same account.");
    }

    if (amount <= 0 || isNaN(amount)) {
      return showFlash("error", "Invalid amount. Amount must be greater than zero.");
    }

    let convertedAmount = amount;
    if (from.currencyType !== to.currencyType) {
      const key = `${from.currencyType}_${to.currencyType}`;
      if (!FX[key]) return showFlash("error", "FX rate not supported.");
      convertedAmount = amount * FX[key];
    }

    if (from.amount < amount) {
      return showFlash("error", "Insufficient funds.");
    }

    const updatedAccounts = accounts.map((acc) => {
      if (acc.id === from.id) return { ...acc, amount: acc.amount - amount };
      if (acc.id === to.id) return { ...acc, amount: acc.amount + convertedAmount };
      return acc;
    });

    setAccounts(updatedAccounts);
    setLogs([
      {
        id: logs.length + 1,
        from_account: from.name,
        to_account: to.name,
        from_currency_type: from.currencyType,
        to_currency_type: to.currencyType,
        amount: convertedAmount,
        note,
        futureDate: dateObj,
        timestamp: new Date().toISOString(),
      },
      ...logs,
    ]);

    showFlash("success", "Transfer successful!");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center">Multi-Currency Transfer Dashboard</h1>

      {/*  Flash message display */}
      <div className="max-w-xl mx-auto">
        <FlashMessage
          type={flashMessage.type}
          message={flashMessage.message}
          onClose={() => setFlashMessage({ type: "", message: "" })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransferMoney accounts={accounts} onTransfer={onTransfer} />
        <Logs param_logs={logs} param_accounts={accounts} />
      </div>
    </div>
  );
}
