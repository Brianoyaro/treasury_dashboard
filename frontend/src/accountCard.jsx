import React from "react";

export default function AccountCard({ account }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-800">{account.name}</h3>
      <p className="text-sm text-gray-500">Currency: {account.currencyType}</p>
      <p className="text-xl font-bold text-blue-600">{account.amount.toLocaleString()} {account.currencyType}</p>
    </div>
  );
}
