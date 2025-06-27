import React from "react";

export default function Logs({ logs }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-lg font-bold mb-4">Transaction Logs</h2>
      {logs.length === 0 && <p className="text-gray-400 text-sm">No transactions yet.</p>}
      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="border-b pb-3">
            <p className="text-sm"><strong>From:</strong> {log.from_account}</p>
            <p className="text-sm"><strong>To:</strong> {log.to_account}</p>
            <p className="text-sm"><strong>Amount:</strong> {log.amount.toFixed(2)} {log.to_currency_type}</p>
            <p className="text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
            {log.note && <p className="text-sm italic">Note: {log.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
