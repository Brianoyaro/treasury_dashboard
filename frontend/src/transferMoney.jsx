import React, { useState } from "react";

export default function TransferMoney({ accounts, onTransfer }) {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleTransfer = (e) => {
    e.preventDefault();
    onTransfer(parseInt(fromAccount), parseInt(toAccount), parseFloat(amount), note);
    setFromAccount("");
    setToAccount("");
    setAmount("");
    setNote("");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow h-full  mx-auto w-full">
      <h2 className="text-lg font-bold mb-4">Transfer Money</h2>
      <form onSubmit={handleTransfer} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            className="w-full p-2 border rounded"
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
            required
          >
            <option value="">From Account</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>{acc.name}</option>
            ))}
          </select>
          <select
            className="w-full p-2 border rounded"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
            required
          >
            <option value="">To Account</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>{acc.name}</option>
            ))}
          </select>
        </div>
        <input
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Transfer
        </button>
      </form>
    </div>
  );
}
